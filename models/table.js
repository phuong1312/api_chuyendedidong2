const mongoose = require("mongoose");
const tableSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    status: {
      type: Boolean,
      default: true,
    },
    area: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Area",
    },
  },
  { timestamps: true }
);

const Table = mongoose.model("Table", tableSchema);
module.exports = Table;
