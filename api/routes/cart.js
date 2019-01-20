const express = require('express');
const router = express.Router();
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
router.post('/:id', (req, res, next) => {
  try {
    addItemToCart(req, res, next);
  } catch (err) {
    console.log('errror returning from add item to cart' + err);
    res.status(400).json(err);
  }
});

//remove product to cart
router.delete('/:id', (req, res, next) => {
  removeItemFromCart(req, res, next);
});

//Checkout - Complete cart
router.post('/completeCart', (req, res, next) => {
  completeCart(req, res, next);
});

module.exports = router;
