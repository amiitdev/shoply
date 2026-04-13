// import express from 'express';
// import Stripe from 'stripe';
// import Order from '../models/order.model.js';
// import { authMiddleware } from '../middleware/auth.middleware.js';

// const router = express.Router();
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// // 💳 CREATE CHECKOUT SESSION
// router.post('/create-checkout-session', authMiddleware, async (req, res) => {
//   try {
//     const { orderId } = req.body;

//     const order = await Order.findById(orderId).populate('items.product');

//     const line_items = order.items.map((item) => ({
//       price_data: {
//         currency: 'inr',
//         product_data: {
//           name: item.product.name,
//         },
//         unit_amount: item.product.price * 100,
//       },
//       quantity: item.quantity,
//     }));
//     const BASE_URL =
//       process.env.NODE_ENV === 'production'
//         ? 'https://e-com-frontend-amber.vercel.app'
//         : 'http://localhost:5173';
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items,
//       mode: 'payment',
//       success_url: `${BASE_URL}/success?orderId=${orderId}`,
//       cancel_url: `${BASE_URL}/cart`,
//     });

//     res.json({ url: session.url });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Stripe error' });
//   }
// });

// // ✅ CONFIRM PAYMENT (THIS IS YOUR CODE)
// router.post('/confirm-payment', authMiddleware, async (req, res) => {
//   try {
//     const { orderId } = req.body;

//     const order = await Order.findById(orderId);

//     if (!order) {
//       return res.status(404).json({ message: 'Order not found' });
//     }

//     order.status = 'paid';
//     order.paidAt = Date.now();

//     await order.save();

//     res.json({ message: 'Payment confirmed', order });
//   } catch (error) {
//     res.status(500).json({ message: 'Error confirming payment' });
//   }
// });

// export default router;

import express from 'express';
import Stripe from 'stripe';
import Order from '../models/order.model.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://e-com-frontend-amber.vercel.app'
    : 'http://localhost:5173';

// 💳 CREATE CHECKOUT SESSION
router.post('/create-checkout-session', authMiddleware, async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findById(orderId).populate('items.product');

    // ✅ Safety checks
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (!order.items || order.items.length === 0) {
      return res.status(400).json({ message: 'Order is empty' });
    }

    // ✅ Create line items
    const line_items = order.items.map((item) => ({
      price_data: {
        currency: 'inr',
        product_data: {
          name: item.product.name,
        },
        unit_amount: item.product.price * 100, // paisa
      },
      quantity: item.quantity,
    }));

    // ✅ Create Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${BASE_URL}/success?orderId=${orderId}`,
      cancel_url: `${BASE_URL}/cart`,
      metadata: {
        orderId: orderId.toString(),
      },
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Stripe Session Error:', error);
    res.status(500).json({ message: 'Stripe error' });
  }
});

export default router;
