import mongoose from 'mongoose';

export const createInventoryItemSchema = () =>
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        unique: true,
      },
      price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be a positive number'],
      },
      stockQuantity: {
        type: Number,
        required: [true, 'Stock quantity is required'],
        min: [0, 'Stock quantity cannot be negative'],
      },
      lowStockThreshold: {
        type: Number,
        default: 10,
        min: [0, 'Low stock threshold cannot be negative'],
      },
      isAvailable: {
        type: Boolean,
        default: true,
      },
    },
    {
      timestamps: true,
    }
  );
