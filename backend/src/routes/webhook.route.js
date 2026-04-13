import express from 'express';
import Stripe from 'stripe';
import Order from '../models/order.model.js';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  async (req, res) => {
    const sig = req.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET,
      );
    } catch (err) {
      console.error('Webhook Error:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      const orderId = session.metadata.orderId;

      const order = await Order.findById(orderId);

      if (order) {
        order.status = 'paid';
        order.paidAt = Date.now();
        await order.save();

        console.log('✅ Payment success:', orderId);
      }
    }

    res.json({ received: true });
  },
);

export default router;
