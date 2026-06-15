import Order from '../models/Order.js';

import PizzaBase from '../models/PizzaBase.js';
import Sauce from '../models/Sauce.js';
import Cheese from '../models/Cheese.js';
import Veggie from '../models/Veggie.js';
import Meat from '../models/Meat.js';

// LOW STOCK CHECK
const checkLowStock = (item) => {
  if (
    item.lowStockThreshold !== undefined &&
    item.stockQuantity < item.lowStockThreshold
  ) {
    console.warn(
      `LOW STOCK WARNING: ${item.name} (${item.stockQuantity})`
    );
  }
};

// CREATE ORDER
export const createOrder = async (req, res, next) => {
  try {
    const {
      pizzaBase,
      sauce,
      cheese,
      veggies = [],
      meats = [],
    } = req.body;

    const base = await PizzaBase.findById(pizzaBase);
    const sauceItem = await Sauce.findById(sauce);
    const cheeseItem = await Cheese.findById(cheese);

    if (!base || !sauceItem || !cheeseItem) {
      res.status(400);
      throw new Error('Invalid base/sauce/cheese selection');
    }

    if (
      base.stockQuantity <= 0 ||
      sauceItem.stockQuantity <= 0 ||
      cheeseItem.stockQuantity <= 0
    ) {
      res.status(400);
      throw new Error('One or more items out of stock');
    }

    let totalPrice =
      base.price + sauceItem.price + cheeseItem.price;

    const veggieItems = await Veggie.find({
      _id: { $in: veggies },
    });

    const meatItems = await Meat.find({
      _id: { $in: meats },
    });

    veggieItems.forEach((v) => (totalPrice += v.price));
    meatItems.forEach((m) => (totalPrice += m.price));

    // reduce stock
    base.stockQuantity -= 1;
    sauceItem.stockQuantity -= 1;
    cheeseItem.stockQuantity -= 1;

    await base.save();
    await sauceItem.save();
    await cheeseItem.save();

    checkLowStock(base);
    checkLowStock(sauceItem);
    checkLowStock(cheeseItem);

    for (const v of veggieItems) {
      v.stockQuantity -= 1;
      await v.save();
      checkLowStock(v);
    }

    for (const m of meatItems) {
      m.stockQuantity -= 1;
      await m.save();
      checkLowStock(m);
    }

    const order = await Order.create({
      user: req.user._id,
      pizzaBase,
      sauce,
      cheese,
      veggies,
      meats,
      totalPrice,
    });

    res.status(201).json({
      success: true,
      data: order,
    });
  } catch (error) {
    next(error);
  }
};


export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    })
      .populate('pizzaBase')
      .populate('sauce')
      .populate('cheese')
      .populate('veggies')
      .populate('meats')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};