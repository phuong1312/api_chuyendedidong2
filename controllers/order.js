const Order = require("../models/order");

const orderController = {
  addOrder: async (req, res) => {
    try {
      const newOrder = new Order(req.body);
      const savedOrder = await newOrder.save();

      console.log("drink: " + newOrder);
      res.status(200).json({
        success: true,
        message: "add success drink order !",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "add fail drink order !",
        error: error.message,
      });
    }
  },
  getAllOrder: async (req, res) => {
    try {
      const orders = await Order.find().populate('drinks');
      res.status(200).json({
        success: true,
        message: "read successful order",
        data: orders,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        data: error,
      });
    }
  },
};

module.exports = orderController;
