const express = require("express");
const router = express.Router();
const { Survivors } = require("../controllers/survivor");

router.get("/:id/survivor/getById", Survivors.getById);
router.get("/survivor/percentage/infected", Survivors.infectedSurvivors);
router.get("/survivor/percentage/nonInfected", Survivors.nonInfectedSurvivors);
router.put("/:id/survivor/update/infected", Survivors.update);
router.put("/:id/survivor/update/location", Survivors.updateLocation);

module.exports = router;
