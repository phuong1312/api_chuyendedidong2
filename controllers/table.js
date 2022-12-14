const Table = require("../models/table");
const Area = require("../models/area");

const tableController = {
  addTable: async (req, res) => {
    try {
      const newTable = new Table(req.body);
      const savedTable = await newTable.save();
      if (req.body.area) {
        const area = Area.findById(req.body.area);
        await area.updateOne({
          $push: {
            tables: savedTable._id,
          },
        });
      }
      res.status(200).json({
        success: true,
        message: "add successful table",
        data: savedTable,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        data: err,
      });
    }
  },

  getAllTable: async (req, res) => {
    try {
      const tables = await Table.find().populate("area");
      res.status(200).json({
        success: true,
        message: "read successful table",
        data: tables,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        data: error,
      });
    }
  },

  deleteTable: async (req, res) => {
    try {
      await Area.updateMany(
        { tables: req.params.id },
        { $pull: { tables: req.params.id } }
      );
      await Table.findByIdAndDelete(req.params.id);
      res.status(200).json({
        success: true,
        message: "deleted successful table",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        data: error,
      });
    }
  },
  getTableByAreaId: async (req, res) => {
    try {
      //const category = await Category.findById(req.params.id);
      const drink = await Table.find({ area: req.params.id });
      res.status(200).json({
        success: true,
        message: "read successful TableByArea",
        data: drink,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        data: error,
      });
    }
  },
};

module.exports = tableController;
