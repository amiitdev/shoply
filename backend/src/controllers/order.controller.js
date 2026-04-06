import Order from '../models/order.model.js';
import Cart from '../models/cart.model.js';

export const createOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      'items.product',
    );
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }
    // Create order items from cart items
    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price,
    }));
    // Calculate total
    const totalPrice = orderItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
    // Create order
    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      totalPrice,
      shippingAddress: req.body.shippingAddress,
    });

    // Clear cart
    cart.items = [];
    await cart.save();

    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    console.error('ORDER ERROR:', error);
    res.status(500).json({ message: 'Error creating order', error });
  }
};

// Get orders for logged in user
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
};

//Get Single Order
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user');

    if (!order) return res.status(404).json({ message: 'Order not found' });

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order', error });
  }
};

//admin - Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
};

//admin - Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = status;
    if (status === 'paid') {
      order.paidAt = Date.now();
    }
    if (status === 'delivered') {
      order.deliveredAt = Date.now();
    }
    await order.save();

    res.json({ message: 'Order status updated', order });
  } catch (error) {
    res.status(500).json({ message: 'Error updating order', error });
  }
};
