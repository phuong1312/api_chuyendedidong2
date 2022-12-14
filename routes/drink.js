const drinkController = require("../controllers/drink");

const router = require("express").Router();

router.post("/add", drinkController.addDrink);

router.get("/list", drinkController.getAllDrink);
router.get("/sortIncrease", drinkController.getSortIncreaseOnPrice);
router.get("/sortDecrease", drinkController.getSortDecreaseOnPrice);
router.get("/:id", drinkController.getDrinkById);
router.get("/category/:id", drinkController.getDrinkByCategoryId);
router.put("/update/:id", drinkController.updateDrink);
router.delete("/delete/:id", drinkController.deleteDrink);

module.exports = router;
