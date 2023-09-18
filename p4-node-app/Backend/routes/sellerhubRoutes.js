const express = require("express");
const router = express.Router();

const Orders = require("../objects/orderObjects");
const order = new Orders();

router.post("/checkout", async (req, res) => {
  try {
    const orderData = req.body;
    const savedOrder = await order.proceedCheckout(req, orderData);
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error creating order", error);
    res.status(500).json({ error: "Internal server error" });
  }
});




router.get("/orders/:orderStatus", async (req, res) => {
  const orderStatus = req.params.orderStatus;

  try {
    const orders = await order.findByStatus(orderStatus);

    if (!orders || orders.length === 0) {
      return res
        .status(404)
        .json({ error: "No orders found for the given status" });
    }

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});



router.put("/orders/:orderId", async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const updatedData = req.body;
    const updatedOrder = await order.updateOrder(orderId, updatedData);

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});




module.exports = router