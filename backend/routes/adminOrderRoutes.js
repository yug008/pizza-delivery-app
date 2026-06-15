import express from 'express';
import { protectAdmin } from '../middleware/adminMiddleware.js';
import {
  getAllOrders,
  updateOrderStatus,
} from '../controllers/adminOrderController.js';

const router = express.Router();

router.use(protectAdmin);

router.get('/', getAllOrders);
router.put('/:id/status', updateOrderStatus);

export default router;