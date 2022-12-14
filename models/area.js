const mongoose = require("mongoose");
const areaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    title: {
      type: String,
    },
    tables: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Table",
      },
    ],
  },
  { timestamps: true }
);

const Area = mongoose.model("Area", areaSchema);
module.exports = Area;
