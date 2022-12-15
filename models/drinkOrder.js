const mongoose = require("mongoose");
const drinkOrderSchema = new mongoose.Schema(
  {
    drink: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Drink",
    },
    qty: {
      type: Number,
    },
  },

  { timestamps: true }
);

const DrinkOrder = mongoose.model("DrinkOrder", drinkOrderSchema);
module.exports = DrinkOrder;
