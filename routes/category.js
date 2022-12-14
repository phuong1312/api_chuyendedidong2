const categoryController = require("../controllers/category");

const router = require("express").Router();

router.post("/add", categoryController.addCategory);
router.get("/list", categoryController.getAllCategory);
router.put("/update/:id", categoryController.updateCategory);
router.delete("/delete/:id", categoryController.deleteCategory);
module.exports = router;
