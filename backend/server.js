import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import errorHandler from './middleware/errorHandler.js';
import authRoutes from './routes/authRoutes.js';
import adminAuthRoutes from './routes/adminAuthRoutes.js';
import inventoryRoutes from './routes/inventoryRoutes.js';
import seedAdmin from './utils/seedAdmin.js';
import orderRoutes from './routes/orderRoutes.js';
import adminOrderRoutes from './routes/adminOrderRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  await seedAdmin();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get('/api/health', (req, res) => {
    res.status(200).json({
      success: true,
      message: 'Server is running',
    });
  });

  app.use('/api/auth', authRoutes);
  app.use('/api/admin/auth', adminAuthRoutes);
  app.use('/api/admin/inventory', inventoryRoutes);
  app.use('/api/orders', orderRoutes);
  app.use('/api/admin/orders', adminOrderRoutes);

  app.use((req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
  });

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
