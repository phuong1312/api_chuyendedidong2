const drinkController = require("../controllers/drink");

const router = require("express").Router();

router.post("/add", drinkController.addDrink);

router.get("/list", drinkController.getAllDrink);
router.get("/sortIncrease", drinkController.getSortIncreaseOnPrice);
router.get("/sortDecrease", drinkController.getSortDecreaseOnPrice);
router.get("/:id", drinkController.getDrinkById);
router.get("/category/:id", drinkController.getDrinkByCategoryId);
router.put("/update/status/:id", drinkController.updateStatus);
router.put("/update/statusall", drinkController.updateStatusAll);
router.put("/update/:id", drinkController.updateDrink);
router.delete("/delete/:id", drinkController.deleteDrink);

router.post("/show/all", drinkController.getDrinkByIds);

module.exports = router;
