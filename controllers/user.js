const User = require("../models/user.js");
const Role = require("../models/role.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userController = {
    //add user
    addUser: async (req, res) => {
        // console.log(req.body);
        try {
            console.log(req.body.user_name == "" && req.body.password == "" && req.body.full_name == "" && req.body.phone == "" && req.body.role == "");
            if (req.body.user_name == "" && req.body.password == "" && req.body.full_name == "" && req.body.phone == "" && req.body.role == "") {
                return res.status(402).json({error:"Vui lòng điền đầy đủ thông tin"});
            }
            else if (req.body.user_name == "") {
                return res.status(402).json({error:"Vui lòng điền Tên Tài Khoản"});
            }
            else if (req.body.password  == "") {
                return res.status(402).json({error:"Vui lòng điền Password"});
            }
            else if (req.body.full_name == "") {
                return res.status(402).json({error:"Vui lòng điền Họ và Tên"});
            }
            else if (req.body.phone == "") {
                return res.status(402).json({error:"Vui lòng điền SĐT"});
            }
            else if (req.body.role == "") {
                return res.status(402).json({error:"Vui lòng chọn vai trò"});
            } else {
                const newUser = new User(req.body);
                const saveUser = await newUser.save();
                // const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET);
                return res.status(200).send(saveUser);
            }
        } catch (err) {
            return res.status(500).json(err);
        };
    },
    //get all user
    getAllUser: async (req, res) => {
        try {
            const getAllUser = await User.find();
            return res.status(200).json(getAllUser);
        } catch (err) {
            return res.status(500).json(err);
        };
    },
    //get user by id
    getUserById: async (req, res) => {
        try {
            const getUser = await User.findById(req.params.id);
            return res.status(200).send(getUser);
        } catch (err) {
            return res.status(500).json(err);
        };
    },
    //delete user by id
    deleteUser: async (req, res) => {
        try {
            // await Role.updateMany({ users: req.params.id }, { $pull: { users: req.params.id } });
            const deleteUser = await User.findByIdAndDelete(req.params.id);
            if (deleteUser) {
                await Role.updateMany({ users: req.params.id }, { $pull: { users: req.params.id } });
            };
            return res.status(200).send({"messenger" : "Delete User is Success!"});
        } catch (err) {
            return  res.status(500).json(err);
        };
    },
    //update user by id
    updateUserById: async (req, res) => {
        try {
            const userFind = await User.findOne({ user_name: req.body.user_name });
            // console.log(req.body.password);
            // console.log(req.body.password == userFind.password);
            if (bcrypt.compareSync(req.body.password, userFind.password) == false && req.body.password != userFind.password) {
                req.body.password = await bcrypt.hash(req.body.password, 8);
                const allUser = await User.findByIdAndUpdate(req.params.id, req.body);
                console.log("ok");
            } else {
                req.body.password = userFind.password;
                const allUser = await User.findByIdAndUpdate(req.params.id, req.body);
                console.log("okla");
            }
            return res.status(200).send("Update user is success!!");
        } catch (err) {
            return res.status(500).json(err);
        };
    },
    //login user
    login: async (req, res) => {
        const { user_name, password } = req.body;
        if (user_name == "" && password == "") {
            return res.status(402).json({ error: "Vui lòng điền đầy đủ User Name và Password" });
        } else if (user_name == "") {
            return res.status(402).json({ error: "Vui lòng điền đầy đủ User Name" });
        } else if (password == "") {
            return res.status(402).json({ error: "Vui lòng điền đầy đủ Password" });
        } else {
            const saveUser = await User.findOne({ user_name: user_name });
            // console.log(saveUser);
            if (!saveUser) {
                return res.status(402).json({ error: "User Name Không Tồn Tại !" });
            }
            try {
                bcrypt.compare(password, saveUser.password, (err, result) => {
                    if (result) {
                        console.log(result);
                        const token = jwt.sign({ _id: saveUser._id }, process.env.JWT_SECRET);
                        return res.status(200).json({ token });
                    } else {
                        // console.log("password does not match");
                        return res.status(402).json({ error: "Sai Password" });
                    }
                });
            } catch (error) {
                return res.status(402).json(error);
            }
        }
        // console.log({user_name: user_name});

    },  

    logout: async (req, res) => {
        console.log(req.body);
    }
};

module.exports = userController;