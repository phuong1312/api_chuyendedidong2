const roleController = require("../controllers/role");

const router = require('express').Router();

//add role
router.post('/add', roleController.addRole);
//get all role
router.get('/all', roleController.getAllRole);
//get role by id
router.get('/rolebyname/:id', roleController.getRoleById);

module.exports = router;