const tableController = require("../controllers/table");

const router = require("express").Router();
router.post("/table/add", tableController.addTable);
router.get("/table/list", tableController.getAllTable);
router.get("/table/area/:id", tableController.getTableByAreaId);
router.delete("/table/delete/:id", tableController.deleteTable);

module.exports = router;
