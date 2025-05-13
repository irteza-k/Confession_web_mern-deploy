const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { AppError } = require('./errorMiddleware');

const protect = async (req, res, next) => {
  try {
    // 1) Check if token exists
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(new AppError('Please provide a valid token', 401));
    }

    const token = authHeader.split(' ')[1];

    // 2) Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new AppError('The user belonging to this token no longer exists', 401));
    }

    // 4) Grant access to protected route
    req.user = user;
    next();
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return next(new AppError('Invalid token. Please log in again', 401));
    }
    if (err.name === 'TokenExpiredError') {
      return next(new AppError('Your token has expired. Please log in again', 401));
    }
    next(err);
  }
};

const admin = async (req, res, next) => {
  try {
    console.log('Admin middleware - User:', {
      id: req.user._id,
      username: req.user.username,
      isAdmin: req.user.isAdmin
    });

    if (!req.user.isAdmin) {
      console.log('Admin middleware - Access denied: User is not admin');
      return next(new AppError('You do not have permission to perform this action', 403));
    }
    console.log('Admin middleware - Access granted');
    next();
  } catch (err) {
    console.error('Admin middleware error:', err);
    next(err);
  }
};

module.exports = { protect, admin };
