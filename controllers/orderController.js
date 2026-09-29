const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');

exports.createOrder = async (req, res) => {
  try {
    const { itemId } = req.body;
    const item = await MenuItem.getMenuItemById(itemId);

    if (!item) {
      return res.status(400).send('Invalid menu item.');
    }

    const order = await Order.createOrder(item.id, item.price);
    res.redirect(`/orders/${order.id}`);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).send('Error processing order.');
  }
};

exports.getOrder = async (req, res) => {
  try {
    const order = await Order.getOrderById(req.params.id);

    if (!order) {
      return res.status(404).send('Order not found.');
    }

    res.render('order_confirmation', { title: 'Order Confirmed', order });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).send('Error loading order page.');
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const quantity = Math.max(1, parseInt(req.body.quantity, 10) || 1);
    await Order.updateQuantity(req.params.id, quantity);
    res.redirect(`/orders/${req.params.id}`);
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).send('Error updating order.');
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    await Order.cancelOrder(req.params.id);
    res.redirect('/');
  } catch (error) {
    console.error('Error cancelling order:', error);
    res.status(500).send('Error cancelling order.');
  }
};