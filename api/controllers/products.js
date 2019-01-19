const mongoose = require('mongoose');
const Product = require('../models/product');
const formatMoney = require('../helpers/formatMoney');
const message = { message: "An error has occurred. Please don't panic out!!!" };

const getAllProducts = (req, res, next) => {
  //1. Query all items
  Product.find()
    .exec()
    .then(doc => {
      //2. Return error message if no items found
      if (doc.length <= 0)
        res.status(200).json({ message: 'No products found' });
      else {
        //3. Return only items with available inventory
        //   if passed ?withInventory parameter
        if (req.url === '/?withInventory') {
          const products = doc
            .filter(item => item.inventory_count > 0)
            .map(item => {
              if (item.inventory_count > 0) {
                return {
                  id: item._id,
                  title: item.title,
                  price: formatMoney(item.price),
                  inventory_count: item.inventory_count
                };
              }
            });

          //3.1 Return error message for no product with availale inventory
          if (products.length < 1) {
            res
              .status(404)
              .json({ message: 'No products with available inventory' });
          }
          res.status(200).json(products);
        } else if (req.url === '/') {
          // 4. return all items with no filter
          const products = doc.map(item => {
            return {
              id: item._id,
              title: item.title,
              price: formatMoney(item.price),
              inventory_count: item.inventory_count
            };
          });
          if (products.length < 1) {
            res.status(404).json({ message: 'No products in store' });
          }
          res.status(200).json(products);
        } else {
          const parameterUsed = req.url.substring(2, req.url.length);
          res.status(400).json({
            message: `Invalid option ${parameterUsed}. Please use: ?withInventory to list only products with available inventory`
          });
        }
      }
    })
    .catch(err => {
      console.log(err);
      send.status(500).json(message);
    });
};

const getProductById = (req, res, next) => {
  const { id } = req.params;
  Product.findById(id)
    .exec()
    .then(doc => {
      if (doc)
        return {
          id: doc._id,
          title: doc.title,
          price: formatMoney(doc.price),
          inventory_count: inventory_count
        };
      doc
        ? res.status(200).json(doc)
        : res.status(404).json({ message: 'No valid entry' });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(message);
    });
};

const purchase = async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findById(id)
    .exec()
    .then(doc => doc);
  const currentInventory = Number(product.inventory_count);
  if (currentInventory < 1) {
    res
      .status(400)
      .json({ message: `Product ${product.title} has no inventory available` });
  } else {
    Product.updateOne(
      { _id: id },
      { $set: { inventory_count: currentInventory - 1 } }
    )
      .exec()
      .then(result => {
        res.status(200).json({ message: `Product ${product.title} sold` });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(message);
      });
  }
};
module.exports = {
  getProductById,
  getAllProducts,
  purchase
};
