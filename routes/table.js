const tableController = require("../controllers/table");

const router = require("express").Router();
router.post("/add", tableController.addTable);
router.get("/list", tableController.getAllTable);
router.get("/area/:id", tableController.getTableByAreaId);
router.delete("/delete/:id", tableController.deleteTable);

module.exports = router;
