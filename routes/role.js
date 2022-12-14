const roleController = require("../controllers/role");

const router = require('express').Router();

//add role
router.post('/', roleController.addRole);
//get all role
router.get('/all', roleController.getAllRole);

module.exports = router;