const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  CustomerName: String,
  Contact: String,
  Address: String,
  TotalAmount: Number,
  Date: String,
  Time: String,
  ModeofPayment: String,
  OrderedItems: [
    {
      Image: String,
      Name: String,
      Price: Number,
      quantity: Number,
      OutOfStock:Boolean
    }
  ],
  isActive: Boolean,
  OrderStatus: String,
  Comments:String,
});

orderSchema.pre('save', function (next) {
  this.isActive = true;
  next();
});

const orderModel = mongoose.model("Order", orderSchema);

module.exports = orderModel;
