import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

export const protectAdmin = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (decoded.role !== 'admin') {
        res.status(403);
        throw new Error('Not authorized, admin access required');
      }

      req.admin = await Admin.findById(decoded.id).select('-password');

      if (!req.admin) {
        res.status(401);
        throw new Error('Not authorized, admin not found');
      }

      next();
    } catch (error) {
      if (res.statusCode === 403) {
        return next(error);
      }

      res.status(401);
      next(new Error('Not authorized, invalid token'));
    }
  } else {
    res.status(401);
    next(new Error('Not authorized, no token'));
  }
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.admin || !roles.includes(req.admin.role)) {
      res.status(403);
      return next(new Error('Not authorized for this action'));
    }

    next();
  };
};
