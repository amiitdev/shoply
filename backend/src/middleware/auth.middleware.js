import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const authMiddleware = async (req, res, next) => {
  try {
    const decodeToken = req.cookies.token;
    if (!decodeToken) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const decoded = jwt.verify(decodeToken, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Unauthorized' });
  }
};

//admin middleware
export const adminOnly = async (req, res, next) => {
  try {
    // Check if user exists
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        message: 'Forbidden: Admin access required',
        yourRole: req.user.role,
      });
    }

    // User is admin, proceed
    next();
  } catch (error) {
    console.error('Admin middleware error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
