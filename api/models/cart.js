const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  title: String,
  price: Number,
  quantity: Number
});

module.exports = mongoose.model('Cart', cartSchema);
