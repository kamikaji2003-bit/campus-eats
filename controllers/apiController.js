const Restaurant = require('../models/Restaurant');
const MenuItem = require('../models/MenuItem');
const Order = require('../models/Order');

exports.getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.getAllRestaurants();
    res.render('index', { restaurants });
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).send('Error loading home page.');
  }
};

exports.getRestaurantMenu = async (req, res) => {
  try {
    const restaurant = await Restaurant.getRestaurantById(req.params.id);

    if (!restaurant) {
      return res.status(404).send('Restaurant not found.');
    }

    const menuItems = await MenuItem.getMenuByRestaurant(req.params.id);
    res.render('menu', { restaurant, menuItems });
  } catch (error) {
    console.error('Error fetching menu:', error);
    res.status(500).send('Error loading menu.');
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

exports.createOrder = async (req, res) => {

    const { itemId } = req.body;

    const item =
        await MenuItem.getMenuItemById(itemId);

    if (!item) {

        return res
            .status(400)
            .json({
                error: 'Invalid menu item'
            });
    }

    const order =
        await Order.createOrder(
            item.id,
            item.price,
            req.session.user.id
        );

    res.status(201).json(order);
};

exports.getStats = async (req, res) => {
  try {
    const stats = await Order.getStats();
    const popularItems = await Order.getPopularItems();
    res.render('stats', { stats, popularItems });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).send('Error loading stats page.');
  }
};