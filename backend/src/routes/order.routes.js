import express from 'express';
import { authMiddleware, adminOnly } from '../middleware/auth.middleware.js';
import {
  createOrder,
  getAllOrders,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
} from '../controllers/order.controller.js';

const router = express.Router();

router.post('/', authMiddleware, createOrder);
router.get('/my-orders', authMiddleware, getMyOrders);
router.get('/:id', authMiddleware, getOrderById);

// Admin routes
router.get('/', authMiddleware, adminOnly, getAllOrders);
router.put('/:id/status', authMiddleware, adminOnly, updateOrderStatus);
export default router;
