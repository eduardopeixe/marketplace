const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const {
  getAllCartItems,
  addItemToCart,
  removeItemFromCart,
  completeCart
} = require('../controllers/cart');

//return all Cart items
router.get('/', (req, res, next) => {
  getAllCartItems(req, res, next);
});

//add product to cart
router.post('/add/:id', checkAuth, (req, res, next) => {
  addItemToCart(req, res, next);
});

//remove product from cart
router.patch('/remove/:id', checkAuth, (req, res, next) => {
  removeItemFromCart(req, res, next);
});

//Checkout - Complete cart
router.post('/complete', checkAuth, (req, res, next) => {
  completeCart(req, res, next);
});

module.exports = router;
