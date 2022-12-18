const billController = require("../controllers/bill");

const router = require("express").Router();
router.post("/add", billController.addBill);
router.get("/list", billController.getAllBill);
//router.delete("/delete/:id", billController.deleteArea);

module.exports = router;
