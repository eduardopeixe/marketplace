const mongoose = require('mongoose');
const Cart = require('../models/cart');
const Product = require('../models/product');
const formatMoney = require('../helpers/formatMoney');
const message = { message: "An error has occurred. Please don't panic out!!!" };

const displayCartItem = item => {
  return {
    id: item._id,
    title: item.title,
    price: formatMoney(item.price),
    quantity: item.quantity
  };
};
const getAllCartItems = (req, res, next) => {
  //1. Query all items from cart
  Cart.find()
    .exec()
    .then(docs => {
      //2. Return items
      if (docs.length < 1) {
        res.status(404).json({ message: `Cart is empty. Please add products` });
      } else {
        let total = 0;
        const cart = docs.map(doc => {
          total += doc.price * doc.quantity;
          return displayCartItem(doc);
        });
        const result = {
          cart,
          total: formatMoney(total)
        };
        res.status(200).json(result);
        //3. If not items to display, return error
      }
    })
    .catch(err => {
      console.log('Error getAllCartItems ' + err);
      res.status(400).json(message);
    });
};
const addItemToCart = async (req, res, next) => {
  //1. get product details from database
  const { id } = req.params;

  const product = await Product.findById(id)
    .exec()
    .then(doc => doc)
    .catch(err => {
      const message = `Error retrieving product details. Please ensure ${id} is a valid ID`;
      console.log(message);
      res.status(400).json({ message });
      next();
    });

  if (product) {
    //2. Check if the is available inventory
    if (product.inventory_count < 1) {
      const message = `No avaliable inventory for ${product.title}.`;
      console.log(message);
      res.status(400).json({ message });
    } else {
      //2. get cart details
      const cart = await Cart.find()
        .exec()
        .catch();
      const hasItemInCart = cart.find(item => item.id === id);

      //3. If item does not exist in cart, add it
      if (!hasItemInCart) {
        const cartProduct = new Cart({
          _id: mongoose.Types.ObjectId(id),
          title: product.title,
          price: product.price,
          quantity: 1
        });
        console.log(cartProduct);
        cartProduct
          .save()
          .then(doc => {
            res
              .status(201)
              .json({ message: `Product ${product.title} added to cart` });
            next();
          })
          .catch(err => {
            const message = `Error adding item to cart`;
            console.log(message + ' ' + err);
            res.status(400).json({ message });
          });
      } else {
        //4. Check if there is enough inventory to add one more to cart
        if (product.inventory_count <= hasItemInCart.quantity) {
          const message = `The ${
            product.title
          } inventory we have is not enough for you. Sorry about that!`;
          res.status(400).json({ message });
        } else {
          console.log(product.inventory_count, hasItemInCart.quantity);
          //4.1 update quantity in cart
          const newQuantity = hasItemInCart.quantity + 1;
          Cart.updateOne({ _id: id }, { $set: { quantity: newQuantity } })
            .exec()
            .then(result => {
              res
                .status(201)
                .json({ message: `Add 1 more ${product.title} to your cart.` });
            });
        }
        //4.1 update
      }
    }
  }
};
const removeItemFromCart = async (req, res, next) => {
  const { id } = req.params;
  //1. check if item is in cart
  const itemInCart = await Cart.findById(id)
    .exec()
    .then(doc => doc)
    .catch(err => {
      console.log(err);
      res.status(500).json(`Error checking item ${id} in cart. `);
    });
  console.log(itemInCart);
  if (itemInCart) {
    //2. Check quantity of item in cart
    if (itemInCart.quantity > 1) {
      //2.1 Reduce quantity by 1
      const newQuantity = itemInCart.quantity - 1;
      Cart.updateOne({ _id: id }, { $set: { quantity: newQuantity } })
        .exec()
        .then(result => {
          res
            .status(200)
            .json({ message: `Removed 1 ${itemInCart.title} from cart.` });
        });
    } else {
      //2.2 remove item from cart
      Cart.deleteOne({ _id: id })
        .exec()
        .then(doc => {
          res
            .status(200)
            .json({ message: `${itemInCart.title} removed from cart.` });
        });
    }
  } else {
    res.status(400).json({ message: `Item ${id} not found in cart.` });
  }
};
const completeCart = (req, res, next) => {
  res.status(200).json({ message: 'completeCart' });
};

module.exports = {
  getAllCartItems,
  addItemToCart,
  removeItemFromCart,
  completeCart
};
