const express = require("express");
const router = express.Router();
const { Survivors } = require("../controllers/survivor");
const { Inventories } = require("../controllers/inventory");

router.post("/inventory/create", Survivors.create, Inventories.create);
router.get("/:id/inventory/getById", Inventories.getById);
router.get("/inventory/averageResource", Inventories.averageOfResources);
router.get("/inventory/lostPoints", Inventories.lostPoints);
router.post("/inventory/getBySurvivor", Inventories.getInventoryBySurvivor);
router.post("/inventory/trading", Inventories.trading);
router.put("/:id/inventory/updateById", Inventories.update);

module.exports = router;
