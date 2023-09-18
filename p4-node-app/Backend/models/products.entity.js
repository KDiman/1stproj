const mongoose = require("mongoose");


const productsSchema = new mongoose.Schema({
  Image: String,
  Name: String,
  Brand: String,
  Type: String,
  Category: String,
  Description: String,
  Size: String,
  Price: Number,
  Stock: Number,
  isActive: Boolean,
  quantity: Number,
  OutOfStock: Boolean
});

productsSchema.pre('save', function (next) {
  this.isActive = true;
  this.OutOfStock = false

  next();
});

const ProductsModel = mongoose.model("Products", productsSchema)

module.exports = ProductsModel