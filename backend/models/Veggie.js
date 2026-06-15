import mongoose from 'mongoose';
import { createInventoryItemSchema } from './inventoryItemSchema.js';

const Veggie = mongoose.model('Veggie', createInventoryItemSchema());

export default Veggie;
