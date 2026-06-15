import mongoose from 'mongoose';
import { createInventoryItemSchema } from './inventoryItemSchema.js';

const Meat = mongoose.model('Meat', createInventoryItemSchema());

export default Meat;
