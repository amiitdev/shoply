import express from 'express';

import {
  addToCart,
  clearCart,
  getCart,
  removeFromCart,
  updateCartItem,
} from '../controllers/cart.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', authMiddleware, addToCart);
router.get('/', authMiddleware, getCart);
router.put('/:productId', authMiddleware, updateCartItem);
router.delete('/:productId', authMiddleware, removeFromCart);
router.delete('/', authMiddleware, clearCart);

export default router;
