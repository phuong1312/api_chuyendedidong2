// const User = require("../models/user");
const Shifts = require("../models/shifts");

const shiftsController = {
    //add shift
    addShift: async (req, res) => {
        try {
            const newShift = new Shifts(req.body);
            const saveShift = await newShift.save();
            return res.status(200).json(saveShift);
        } catch (err) {
            res.status(500).json(err);
        };
    },
    //get shifts by id
    getShiftsById: async (req, res) => {
        try {
            const shifts = await Shifts.find({ users: req.params.id });
            console.log(!shifts.includes(req.params.id));
            if (!shifts.includes(req.params.id) == true) {
                // const { users, ...other } = shifts._doc;
                return res.status(200).json(shifts);
            } else {
                return res.status(401).json({ error: "Can not find user in shifts"})
            }
        } catch (err) {
            return res.status(500).json(err);
        };
    },
    //get shifts
    getAllShift: async (req, res) => {
        try {
            const shifts = await Shifts.find();
            return res.status(200).json(shifts);
        } catch (err) {
            return res.status(500).json(err);
        };
    },
};
module.exports = shiftsController;