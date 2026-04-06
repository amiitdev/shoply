import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  name: String,
  price: Number,
  image: String,
  quantity: Number,
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    items: [orderItemSchema],

    totalPrice: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ['pending', 'paid', 'shipped', 'delivered'],
      default: 'pending',
    },

    shippingAddress: {
      address: String,
      city: String,
      postalCode: String,
      country: String,
    },

    paidAt: Date,
    deliveredAt: Date,
  },
  { timestamps: true },
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
