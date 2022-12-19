const Shifts = require("../models/shifts");
const ShiftsOfUser = require("../models/shiftOfUser");
// const User = require("../models/user");

const shiftOfUserController = {
    //add shift of user
    addshiftOfUser: async (req, res) => {
        try {
        const check = await ShiftsOfUser.find({$and:[{id_shift: req.body.id_shift}, {id_user: req.body.id_user}]});
        // const check = await ShiftsOfUser.find({id_user: req.body.id_user});
            // return res.status(200).json(check);
            if (check == "") {
                const newShiftOfUser = new ShiftsOfUser(req.body);
                const saveShiftOfUser = await newShiftOfUser.save();
                if (req.body.id_shift) {
                    const shifts = await Shifts.findById(req.body.id_shift);
                    await shifts.updateOne({ $addToSet: { users: saveShiftOfUser.id_user } }, { $push: { users: saveShiftOfUser.id_user } });
                }
                return res.status(200).json(saveShiftOfUser);
            } else {
                return res.status(403).json({error: "You have signed up for this shift"});
            }
        } catch (err) {
            res.status(500).json(err);
        };
    },
    //check in
    checkIn: async (req, res) => {
        try {
            let time = new Date().getTime();
            let date = new Date().toLocaleDateString("en-GB");
            const checkShifts = await Shifts.findOne({ date: date });
            const check = await ShiftsOfUser.findOne({$and:[{id_shift: checkShifts._id}, {id_user: req.params.id}]});
            if (!check.check_in || check.check_in == "") {
                const checkIn = await ShiftsOfUser.findByIdAndUpdate(check._id, { $set: { check_in: time } });
                return res.status(200).json({mess: "Check in is sucess"});
            } else {
                return res.status(403).json({ error: 'You are checked!!' });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },
    //check in
    checkOut: async (req, res) => {
        try {
            let time = new Date().getTime();
            let date = new Date().toLocaleDateString("en-GB");
            const checkShifts = await Shifts.findOne({ date: date });
            const check = await ShiftsOfUser.findOne({$and:[{id_shift: checkShifts._id}, {id_user: req.params.id}]});
            if (!check.check_out || check.check_out == "") {
                const checkOut = await ShiftsOfUser.findByIdAndUpdate(check._id, { $set: { check_out: time } });
                return res.status(200).json({mess: "Check in is sucess"});
            } else if (!check) {
                return res.status(403).json({ error: 'You not have shift to day'})
            } else {
                return res.status(403).json({ error: 'You are checked!!' });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
};
module.exports = shiftOfUserController;