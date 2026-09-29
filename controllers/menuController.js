const Restaurant = require('../models/Restaurant');
const MenuItem = require('../models/MenuItem');

exports.getMenuByRestaurant = async (req, res) => {
  try {
    const restaurantId = req.params.id;

    // 1. Fetch restaurant info from Restaurant model
    const restaurant = await Restaurant.getRestaurantById(restaurantId);

    if (!restaurant) {
      return res.status(404).send('Restaurant not found.');
    }

    // 2. Fetch menu items from MenuItem model using getMenuByRestaurant
    const menuItems = await MenuItem.getMenuByRestaurant(restaurantId);

    // 3. Render the menu view
    res.render('menu', { 
      title: `Menu — ${restaurant.name}`, 
      restaurant, 
      menuItems 
    });

  } catch (error) {
    console.error('Error fetching menu:', error);
    res.status(500).send('Error loading menu page.');
  }
};