const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  title: String,
  price: Number,
  inventory_count: Number
});

module.exports = mongoose.model('Product', productSchema);
