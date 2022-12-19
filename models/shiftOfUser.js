const mongoose = require('mongoose');
// const timeSchema = new mongoose.Schema({
//     hour:{type: Number},
//     minute:{type: Number}
// });
const shiftOfUserSchema = new mongoose.Schema({
    id_shift: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shifts",
        required: true,
    },
    id_user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    time_start: {
        type: Date,
    },
    time_end: {
        type: Date,
    },
    check_in:{
        type: Date,
    },
    check_out:{
        type: Date,
    },
    working_hours: {
        type: Number, 
        required: true
    }
});

let Shifts = mongoose.model("ShiftOfUser", shiftOfUserSchema);
module.exports = Shifts;