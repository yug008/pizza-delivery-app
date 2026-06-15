import express from 'express';
import {
  loginAdmin,
  getAdminProfile,
} from '../controllers/adminAuthController.js';
import { protectAdmin, authorizeRoles } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.get('/profile', protectAdmin, authorizeRoles('admin'), getAdminProfile);

export default router;
