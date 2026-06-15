import mongoose from 'mongoose';
import { createInventoryItemSchema } from './inventoryItemSchema.js';

const Cheese = mongoose.model('Cheese', createInventoryItemSchema());

export default Cheese;
