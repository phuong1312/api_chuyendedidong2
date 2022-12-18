const roleController = require("../controllers/role");

const router = require('express').Router();

//add role
router.post('/add', roleController.addRole);
//get all role
router.get('/all', roleController.getAllRole);
//get role by name
router.get('/rolebyname', roleController.getRoleByName);

module.exports = router;