const drinkOrderController = require("../controllers/drinkOrder");

const router = require("express").Router();

router.post("/add", drinkOrderController.addDrinkOrder);
router.get("/list", drinkOrderController.getAllDrinkOrder);
router.get(
  "/list/decrease/createat",
  drinkOrderController.getAllDrinkOrderDecrease
);
router.put("/update/:id", drinkOrderController.updateDrinkOrder);
router.delete("/delete/:id", drinkOrderController.deleteDrinkOrder);

module.exports = router;
