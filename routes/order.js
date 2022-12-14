const orderController = require("../controllers/order");

const router = require("express").Router();

router.post("/add", orderController.addOrder);
router.get("/list", orderController.getAllOrder);

module.exports = router;
