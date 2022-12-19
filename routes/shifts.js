const router = require('express').Router();
const shiftsController = require('../controllers/shifts');

//add shift
router.get('/add', shiftsController.addShift);
//get role by id
router.get('/shiftsbyid/:id', shiftsController.getShiftsById);
//get all role
router.get('/all', shiftsController.getAllShift);
module.exports = router;