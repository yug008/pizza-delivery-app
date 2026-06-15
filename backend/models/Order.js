import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    pizzaBase: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PizzaBase',
      required: true,
    },

    sauce: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Sauce',
      required: true,
    },

    cheese: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cheese',
      required: true,
    },

    veggies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Veggie',
      },
    ],

    meats: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Meat',
      },
    ],

    totalPrice: {
      type: Number,
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ['Pending', 'Paid'],
      default: 'Pending',
    },

    orderStatus: {
      type: String,
      enum: [
        'Order Received',
        'In Kitchen',
        'Sent For Delivery',
      ],
      default: 'Order Received',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);