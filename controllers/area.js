const Area = require("../models/area");
const Table = require("../models/table");

const areaController = {
  addArea: async (req, res) => {
    try {
      console.log(req.body);
      const newArea = new Area(req.body);
      const saveArea = await newArea.save();
      res.status(200).json({
        success: true,
        message: "add successful area",
        data: saveArea,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: message.error,
      });
    }
  },

  getAllArea: async (req, res) => {
    try {
      const areas = await Area.find();
      res.status(200).json({
        success: true,
        message: "read successful areas",
        data: areas,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        data: error,
      });
    }
  },

  deleteArea: async (req, res) => {
    try {
      await Table.updateMany({ area: req.params.id }, { area: null });
      await Area.findByIdAndDelete(req.params.id);
      res.status(200).json({
        success: true,
        message: "deleted successful category",
      });
    } catch (error) {
      console.log("ERR: " + error);
      res.status(500).json({
        success: false,
        data: error,
      });
    }
  },
};

module.exports = areaController;
