const Bill = require("../models/bill");

const billController = {
  addBill: async (req, res) => {
    try {
      //console.log(req.body);
      const newBill = new Bill(req.body);
      const saveBill = await newBill.save();
      res.status(200).json({
        success: true,
        message: "add successful bill",
        data: saveBill,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: message.error,
      });
    }
  },

  getAllBill: async (req, res) => {
    try {
      const bills = await Bill.find().populate("order");
      res.status(200).json({
        success: true,
        message: "read successful bill",
        data: bills,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        data: error,
      });
    }
  },
};

module.exports = billController;
