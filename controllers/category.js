const Category = require("../models/category");
const Drink = require("../models/drink");

const categoryController = {
  addCategory: async (req, res) => {
    try {
      console.log(req.body);
      const newCategory = new Category(req.body);
      const savedCategory = await newCategory.save();
      res.status(200).json({
        success: true,
        message: "add successful category",
        data: savedCategory,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: message.error,
      });
    }
  },

  getAllCategory: async (req, res) => {
    try {
      const categories = await Category.find();
      res.status(200).json({
        success: true,
        message: "read successful categories",
        data: categories,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        data: error,
      });
    }
  },
  updateCategory: async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);
      //, time_update: Date.now()
      await category.updateOne({ $set: req.body });
      res.status(200).json({
        success: true,
        message: "update successful category",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        data: error,
      });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      await Drink.updateMany({ category: req.params.id }, { category: " " });
      await Category.findByIdAndDelete(req.params.id);
      res.status(200).json({
        success: true,
        message: "deleted successful category",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        data: error,
      });
    }
  },
};

module.exports = categoryController;
