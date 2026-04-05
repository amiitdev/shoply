import express from 'express';
import {
  adminUser,
  getProfile,
  login,
  register,
} from '../controllers/auth.controller.js';
import { adminOnly, authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/user', authMiddleware, getProfile);
router.get('/admin', authMiddleware, adminOnly, adminUser);

export default router;
