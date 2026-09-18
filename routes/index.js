const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const aboutController = require('../controllers/aboutController');
const menuController = require('../controllers/menuController');
const orderController = require('../controllers/orderController');

// --- ADD THESE LOGS TO DEBUG ---
console.log("createOrder:", typeof orderController.createOrder);
console.log("getMenuByRestaurant:", typeof menuController.getMenuByRestaurant);
console.log("getHome:", typeof homeController.getHome);
console.log("getAbout:", typeof aboutController.getAbout);

router.post('/orders', orderController.createOrder);
router.get('/restaurants/:id/menu', menuController.getMenuByRestaurant);
router.get('/', homeController.getHome);
router.get('/about', aboutController.getAbout);

module.exports = router;