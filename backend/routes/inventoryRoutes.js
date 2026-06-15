import express from 'express';
import { protectAdmin, authorizeRoles } from '../middleware/adminMiddleware.js';
import { createInventoryHandlers } from '../controllers/inventoryController.js';
import PizzaBase from '../models/PizzaBase.js';
import Sauce from '../models/Sauce.js';
import Cheese from '../models/Cheese.js';
import Veggie from '../models/Veggie.js';
import Meat from '../models/Meat.js';

const router = express.Router();

router.use(protectAdmin, authorizeRoles('admin'));

const pizzaBaseHandlers = createInventoryHandlers(PizzaBase, 'Pizza base');
const sauceHandlers = createInventoryHandlers(Sauce, 'Sauce');
const cheeseHandlers = createInventoryHandlers(Cheese, 'Cheese');
const veggieHandlers = createInventoryHandlers(Veggie, 'Veggie');
const meatHandlers = createInventoryHandlers(Meat, 'Meat');

router
  .route('/pizza-bases')
  .post(pizzaBaseHandlers.create)
  .get(pizzaBaseHandlers.getAll);

router
  .route('/pizza-bases/:id')
  .put(pizzaBaseHandlers.update)
  .delete(pizzaBaseHandlers.remove);

router.route('/sauces').post(sauceHandlers.create).get(sauceHandlers.getAll);

router
  .route('/sauces/:id')
  .put(sauceHandlers.update)
  .delete(sauceHandlers.remove);

router.route('/cheeses').post(cheeseHandlers.create).get(cheeseHandlers.getAll);

router
  .route('/cheeses/:id')
  .put(cheeseHandlers.update)
  .delete(cheeseHandlers.remove);

router.route('/veggies').post(veggieHandlers.create).get(veggieHandlers.getAll);

router
  .route('/veggies/:id')
  .put(veggieHandlers.update)
  .delete(veggieHandlers.remove);

router.route('/meats').post(meatHandlers.create).get(meatHandlers.getAll);

router
  .route('/meats/:id')
  .put(meatHandlers.update)
  .delete(meatHandlers.remove);

export default router;
