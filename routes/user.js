const userController = require("../controllers/user");
const authTokenRequired = require("../config/authTokenRequired");
const router = require('express').Router();

//login user
router.post('/login', userController.login);
// //logout user
router.delete('/logout', authTokenRequired,userController.logout);
//add user
router.post('/add', userController.addUser);
//get all user
router.get('/all', userController.getAllUser);
//get one user by id
router.get('/getbyid/:id', userController.getUserById);
//delete user by id
router.delete('/delete/:id', userController.deleteUser);
//update user
router.put('/update/:id', userController.updateUserById);
//get list user sort increase
router.get("/sortIncrease", userController.getSortIncreaseOnName);
//get list user sort decrease
router.get("/sortDecrease", userController.getSortDecreaseOnName);
//get user by role id
router.get("/role/:id", userController.getUserByRoleId);
//check token
router.get('/check/:token', userController.checkToken);
//add user
router.get('/search/:key', userController.searchByUserName);
module.exports = router;