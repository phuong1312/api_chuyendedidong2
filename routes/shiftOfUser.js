const router = require('express').Router();
const shiftOfUserControllers = require('../controllers/shiftOfUser');

//add shift of user
router.post('/add', shiftOfUserControllers.addshiftOfUser);
//check in user
router.put('/checkin/:id', shiftOfUserControllers.checkIn);
//check out
router.put('/checkout/:id', shiftOfUserControllers.checkOut);
module.exports = router;