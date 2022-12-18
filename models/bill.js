const mongoose = require("mongoose");
const billSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  },
  { timestamps: true }
);

const Bill = mongoose.model("Area", billSchema);
module.exports = Bill;
