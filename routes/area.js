const areaController = require("../controllers/area");

const router = require("express").Router();
router.post("/add", areaController.addArea);
router.get("/list", areaController.getAllArea);
router.delete("/delete/:id", areaController.deleteArea);

module.exports = router;
