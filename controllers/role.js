const Role = require("../models/role");

const roleController = {
    //add role
    addRole: async (req, res) => {
        try {
            const newRole = new Role(req.body);
            const saveRole = await newRole.save();
            return res.status(200).json(saveRole);
        } catch (err) {
            res.status(500).json(err);
        };
    },
    //get all role
    getAllRole: async (req, res) => {
        try {
            const getAllRole = await Role.find();
            return res.status(200).json(getAllRole);
            // console.log(getAllUser);
        } catch (err) {
            return res.status(500).json(err);
        };
    },
    //get role by id
    getRoleByName: async (req, res) => {
        try {
            const role = await Role.findOne({_id: req.params.id});
            const {_id, ...other} = role._doc;
            return res.status(200).json({...other});
            // console.log(getAllUser);
        } catch (err) {
            return res.status(500).json(err);
        };
    },
};

module.exports = roleController;