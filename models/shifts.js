const mongoose = require('mongoose');
const shiftsSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
    },
    users:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    hours: {
        type: Number,
        required: true,
    }
});

let Shifts = mongoose.model("Shifts", shiftsSchema);
module.exports = Shifts;