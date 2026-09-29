const Restaurant = require('../models/Restaurant');
const Order = require('../models/Order');

exports.getHome = async (req, res) => {
  try {
    const restaurants = await Restaurant.getAllRestaurants();
    const stats = await Order.getStats();
    const popularItems = await Order.getPopularItems();

    res.render('index', {
      title: 'Campus Eats',
      restaurants,
      stats,
      popularItems
    });

  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading homepage.');
  }
};