import express from 'express';
import Stripe from 'stripe';
import Order from '../models/order.model.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// 💳 CREATE CHECKOUT SESSION
router.post('/create-checkout-session', authMiddleware, async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findById(orderId).populate('items.product');

    const line_items = order.items.map((item) => ({
      price_data: {
        currency: 'inr',
        product_data: {
          name: item.product.name,
        },
        unit_amount: item.product.price * 100,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `http://localhost:5173/success?orderId=${orderId}`,
      cancel_url: `http://localhost:5173/cart`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Stripe error' });
  }
});

// ✅ CONFIRM PAYMENT (THIS IS YOUR CODE)
router.post('/confirm-payment', authMiddleware, async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = 'paid';
    order.paidAt = Date.now();

    await order.save();

    res.json({ message: 'Payment confirmed', order });
  } catch (error) {
    res.status(500).json({ message: 'Error confirming payment' });
  }
});

export default router;
