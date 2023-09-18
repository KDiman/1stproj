const orderModel = require("../models/order.entity");
const mongoose = require("mongoose");

class Orders {
  constructor() {}

  async proceedCheckout(res, orderData) {
    try {
      const {
        CustomerName,
        Contact,
        Address,
        TotalAmount,
        Date,
        Time,
        ModeofPayment,
        OrderedItems,
        OrderStatus,
        Comments,
      } = orderData;
      const newOrder = new orderModel({
        CustomerName,
        Contact,
        Address,
        TotalAmount,
        Date,
        Time,
        ModeofPayment,
        OrderedItems,
        OrderStatus,
        Comments,
      });
      const saveOrder = await newOrder.save();
      return saveOrder;
    } catch (error) {
      console.error("Error creating new order", error);
      throw error;
    }
  }

  async findByStatus(status) {
    try {
      return await orderModel.find({ OrderStatus: status });
    } catch (error) {
      console.error("Error finding orders by status:", error);
      throw error;
    }
  }


  
  async updateOrder(orderId, updatedData) {
    try {
      const orderToUpdate = await orderModel.findById(orderId);
  
      if (!orderToUpdate) {
        throw new Error(`Order with ID '${orderId}' not found`);
      }
  
      if (updatedData.OrderStatus) {
        orderToUpdate.OrderStatus = updatedData.OrderStatus;
      }
      if (updatedData.Comments) {
        orderToUpdate.Comments = updatedData.Comments;
      }
  
      const updatedOrder = await orderToUpdate.save();
      return updatedOrder;
    } catch (error) {
      console.error("Error updating order:", error);
      throw error;
    }
  }
  
}

module.exports = Orders;
