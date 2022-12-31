const mongoose = require("mongoose");
const drinkOrderSchema = new mongoose.Schema(
  {
    drink: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Drink",
    },
    table: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Table",
    },
    qty: {
      type: Number,
    },
    status: {
      type: Boolean,
      default: false,
    },
    arrive: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      required: true,
    },
  },

  { timestamps: true }
);

const DrinkOrder = mongoose.model("DrinkOrder", drinkOrderSchema);
module.exports = DrinkOrder;
