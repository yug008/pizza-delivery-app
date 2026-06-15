import mongoose from 'mongoose';
import { createInventoryItemSchema } from './inventoryItemSchema.js';

const Sauce = mongoose.model('Sauce', createInventoryItemSchema());

export default Sauce;
