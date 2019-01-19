const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  purchase
} = require('../controllers/products');

//retun all products
router.get('/', (req, res, next) => {
  getAllProducts(req, res, next);
});

//return a single product
router.get('/:id', (req, res, next) => {
  getProductById(req, res, next);
});

//update a product
router.patch('/purchase/:id', (req, res, next) => {
  purchase(req, res, next);
});

module.exports = router;
