import express from 'express';
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProductById,
} from '../controllers/product.controller.js';

import { authMiddleware, adminOnly } from '../middleware/auth.middleware.js';
import upload from '../middleware/upload.middleware.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post(
  '/',
  authMiddleware,
  adminOnly,
  upload.single('image'),
  createProduct,
);
router.put(
  '/:id',
  authMiddleware,
  adminOnly,
  upload.single('image'),
  updateProduct,
);
router.delete('/:id', authMiddleware, adminOnly, deleteProduct);

export default router;
