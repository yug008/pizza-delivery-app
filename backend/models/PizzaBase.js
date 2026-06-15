import mongoose from 'mongoose';
import { createInventoryItemSchema } from './inventoryItemSchema.js';

const PizzaBase = mongoose.model('PizzaBase', createInventoryItemSchema());

export default PizzaBase;
