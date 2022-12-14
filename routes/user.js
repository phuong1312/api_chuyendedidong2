const userController = require("../controllers/user");

const router = require('express').Router();

//login user
router.post('/login', userController.login);
//logout user
router.post('/logout', userController.logout);
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
module.exports = router;