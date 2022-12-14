const Drink = require("../models/drink");
const Category = require("../models/category");
const fs = require("fs");
const mongoose = require("mongoose");
const drinkController = {
  //add user
  addDrink: async (req, res) => {
    try {
      const newDrink = new Drink({
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        category: req.body.category,
      });
      console.log(newDrink);
      const saveDrink = await newDrink.save();
      if (req.body.category) {
        const category = Category.findById(req.body.category);
        await category.updateOne({
          $push: {
            drinks: saveDrink._id,
          },
        });
      }
      res.status(200).json({
        success: true,
        message: "add successful drinks",
        data: {
          name: req.body.name,
          price: req.body.price,
          image: req.body.image,
          category: req.body.category,
        },
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        data: err,
      });
    }
  },

  getAllDrink: async (req, res) => {
    try {
      const drinks = await Drink.find();
      res.status(200).json({
        success: true,
        message: "read successful drinks",
        data: drinks,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        data: error,
      });
    }
  },

  getSortIncreaseOnPrice: async (req, res) => {
    try {
      const drinks = await Drink.find().sort({ price: 1 });
      res.status(200).json({
        success: true,
        message: "read successful drinks sort increase on price",
        data: drinks,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        data: error,
      });
    }
  },

  getSortDecreaseOnPrice: async (req, res) => {
    try {
      const drinks = await Drink.find().sort({ price: -1 });
      res.status(200).json({
        success: true,
        message: "read successful drinks sort decrease on price",
        data: drinks,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        data: error,
      });
    }
  },

  getDrinkById: async (req, res) => {
    try {
      const drink = await Drink.findById(req.params.id);
      //console.log(drink);
      res.status(200).json({
        success: true,
        message: "read successful drink",
        data: drink,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        data: error,
      });
    }
  },

  getDrinkByCategoryId: async (req, res) => {
    try {
      //const category = await Category.findById(req.params.id);
      const drink = await Drink.find({ category: req.params.id });
      res.status(200).json({
        success: true,
        message: "read successful drink",
        data: drink,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        data: error,
      });
    }
  },

  // $set: {
  //   name: req.body.name,
  //   price: req.body.price,
  //   image: req.file.path,
  //   category: req.body.category,
  // },
  updateDrink: async (req, res) => {
    try {
      const drink = await Drink.findById(req.params.id);

      await drink.updateOne({
        $set: {
          name: req.body.name,
          price: req.body.price,
          image: req.body.image,
          category: req.body.category,
        },
      });

      res.status(200).json({
        success: true,
        message: "update successful drink",
        // date: drink,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        data: error,
      });
    }
  },
  deleteDrink: async (req, res) => {
    try {
      await Category.updateMany(
        { drinks: req.params.id },
        { $pull: { drinks: req.params.id } }
      );
      await Drink.findByIdAndDelete(req.params.id);
      res.status(200).json({
        success: true,
        message: "deleted successful drink",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        data: error,
      });
    }
  },
  updateStatus: async (req, res) => {
    try {
      const drink = Drink.findById(req.params.id);
      await drink.updateOne({ $set: { status: req.body.status } });
      res.status(200).json({
        success: true,
        message: "update successful status drink",
        data: req.body.status,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        data: error,
      });
    }
  },

  updateStatusAll: async (req, res) => {
    try {
      const drink = Drink.find();
      await drink.updateMany({ $set: { status: false } });
      res.status(200).json({
        success: true,
        message: "updateAll successful status drink",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        data: error,
      });
    }
  },
  getDrinkByIds: async (req, res) => {
    try {
      const ids = req.body.items.map(mongoose.Types.ObjectId);

      const drinks = await Drink.find({
        _id: {
          $in: ids,
        },
      });
      console.log(drinks);
      res.status(200).json({
        success: true,
        message: "get drink by ids successful ",
        data: drinks,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        data: error,
      });
    }
  },
};

module.exports = drinkController;
