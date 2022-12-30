const User = require("../models/user.js");
const Role = require("../models/role.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
let format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
const userController = {
    //add user
    addUser: async (req, res) => {
        // console.log(req.body);
        try {
            if (req.body.user_name == "" && req.body.password == "" && req.body.full_name == "" && req.body.phone == "" && req.body.role == "") {
                return res.status(402).json({ error: "Please complete all information" });
            }
            else if (req.body.user_name == "") {
                return res.status(402).json({ error: "Please enter your Account Name" });
            }
            else if (req.body.password == "") {
                return res.status(402).json({ error: "Please enter Password" });
            }
            else if (req.body.full_name == "") {
                return res.status(402).json({ error: "Please enter your first and last name" });
            }
            else if (req.body.phone == "") {
                return res.status(402).json({ error: "Please fill in your phone number" });
            }
            else if (req.body.role == "") {
                return res.status(402).json({ error: "Please select a role" });
            }
            else if (format.test(req.body.user_name)) {
                return res.status(402).json({ error: "user name contain special characters" });
            }
            else if (format.test(req.body.password)) {
                return res.status(402).json({ error: "password contain special characters" });
            }
            else if (format.test(req.body.full_name)) {
                return res.status(402).json({ error: "full name contain special characters" });
            } else {
                const newUser = new User(req.body);
                const checkUser = await newUser.save();
                return res.status(200).send(checkUser);
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
            return res.status(200).send({ "messenger": "Delete User is Success!" });
        } catch (err) {
            return res.status(500).json(err);
        };
    },
    //update user by id
    updateUserById: async (req, res) => {
        try {
            // if (bcrypt.compareSync(req.body.password, userFind.password) == false && req.body.password != userFind.password) {
            //     req.body.password = await bcrypt.hash(req.body.password, 8);
            //     const allUser = await User.findByIdAndUpdate(req.params.id, req.body);
            //     return res.status(200).send({ msg: "Update user is success!!" });
            // } else {
            //     req.body.password = userFind.password;
            //     const allUser = await User.findByIdAndUpdate(req.params.id, req.body);
            //     // return res.status(200).send({msg:"Update user is success!!"});
            //     return res.status(200).send({ msg: "Update user is success!!" });
            // }

            if (req.body.user_name == "" && req.body.password == "" && req.body.full_name == "" && req.body.phone == "" && req.body.role == "") {
                return res.status(402).json({ error: "Please complete all information" });
            }
            else if (req.body.user_name == "") {
                return res.status(402).json({ error: "Please enter your Account Name" });
            }
            else if (req.body.password == "") {
                return res.status(402).json({ error: "Please enter Password" });
            }
            else if (req.body.full_name == "") {
                return res.status(402).json({ error: "Please enter your first and last name" });
            }
            else if (req.body.phone == "") {
                return res.status(402).json({ error: "Please fill in your phone number" });
            }
            else if (req.body.role == "") {
                return res.status(402).json({ error: "Please select a role" });
            }
            else if (format.test(req.body.user_name)) {
                return res.status(402).json({ error: "user name contain special characters" });
            }
            else if (format.test(req.body.password)) {
                return res.status(402).json({ error: "password contain special characters" });
            }
            else if (format.test(req.body.full_name)) {
                return res.status(402).json({ error: "full name contain special characters" });
            } else {
                const allUser = await User.findByIdAndUpdate(req.params.id, req.body);
                return res.status(200).send({ msg: "Update user is success!!" });
            }
        } catch (err) {
            return res.status(500).json(err);
        };
    },

    // checkPass: async (user, pass) => {
    //     console.log(user);
    //     const checkUser = await User.findOne({ user_name: user.user_name });
    //     bcrypt.compare(password, checkUser.password, (err, result) => {
    //         if (result) {
    //             return res.status(200).json({ ...other });
    //         } else {
    //             return res.status(402).json({ error: "Wrong Password" });
    //         }
    //     });
    //     return bcrypt.compare(pass, checkUser.password);
    // },

    // changePass: async (req, res) => {
    //     try {
    //         if (condition) {

    //         } else {
    //             const user = await User.findOne(req.params.id);
    //             await user.updateOne(req.params.id, { password: req.body });
    //             return res.status(200).json({ msg: "Password is update success" })
    //         }
    //     } catch (error) {
    //         return res.status(400).json({ error: error });
    //     }
    // },

    createToken: (checkUser) => {
        return jwt.sign({ _id: checkUser._id, role: checkUser.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
    },
    //login user
    login: async (req, res) => {
        const { user_name, password } = req.body;
        if (user_name == "" && password == "") {
            return res.status(402).json({ error: "Please fill in User Name and Password" });
        } else if (user_name == "") {
            return res.status(402).json({ error: "Please complete User Name" });
        } else if (password == "") {
            return res.status(402).json({ error: "Please fill in the full Password" });
        } else if (format.test(password) || format.test(user_name)) {
            return res.status(402).json({ error: "user name and password contain special characters" });
        } else {
            const checkUser = await User.findOne({ user_name: user_name });
            if (!checkUser) {
                return res.status(402).json({ error: "User Name Does Not Exist !" });
            }
            try {
                bcrypt.compare(password, checkUser.password, (err, result) => {
                    if (result) {
                        const token = userController.createToken(checkUser);
                        console.log(token);
                        res.cookie("token", token, {
                            httpOnly: true,
                            secure: true,
                            // secure: false,
                            sameSite: "strict",
                        });
                        const { password, ...other } = checkUser._doc
                        return res.status(200).json({ ...other , token});
                    } else {
                        return res.status(402).json({ error: "Wrong Password" });
                    }
                });
            } catch (error) {
                return res.status(402).json(error);
            }
        }
    },
    
    //get list sort user 
    getSortIncreaseOnName: async (req, res) => {
        try {
            const drinks = await User.find().collation({ locale: 'en', strength: 2 }).sort({ user_name: 1 });
            res.status(200).json({
                success: true,
                message: "read successful drinks sort increase on price",
                data: drinks,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                data: error,
            });
        }
    },
    getSortDecreaseOnName: async (req, res) => {
        try {
            const drinks = await User.find().collation({ locale: 'en', strength: 2 }).sort({ user_name: -1 });
            res.status(200).json({
                success: true,
                message: "read successful drinks sort decrease on price",
                data: drinks,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                data: error,
            });
        }
    },
    //get user by role
    getUserByRoleId: async (req, res) => {
        try {
            //const category = await Category.findById(req.params.id);
            const users = await User.find({ role: req.params.id });
            res.status(200).json({
                success: true,
                message: "read successful drink",
                data: users,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                data: error,
            });
        }
    },
    //logout
    logout: async (req, res) => {
        try {
            res.clearCookie("token");
            return res.status(200).json({ msg: "logout is success" });
        } catch (error) {
            return res.status(403).json({ err: error });
        }
    },
    //check token
    checkToken: async (req, res) => {
        try {
            return res.status(200).json({ msg: "token is success" });
        } catch (error) {
            return res.status(403).json({ err: error });
        }
    }
};

module.exports = userController;