const Inventory = require("../modals/inventory");
const Survivor = require("../modals/survivor");

exports.Inventories = {
  create: (req, res) => {
    try {
      const newInventory = new Inventory({
        survivorId: req.survivordata._id,
      });
      newInventory
        .save()
        .then((data) => {
          res.json({
            InventoryData: data,
            survivordata: req.survivordata,
          });
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getById: (req, res) => {
    try {
      Inventory.findById({ _id: req.params.id })
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  update: async (req, res) => {
    try {
      const inventory = await Inventory.findOne({ _id: req.params.id });
      inventory.water.numberOfWater = req.body.numberOfWater;
      inventory.food.numberOfFood = req.body.numberOfFood;
      inventory.medication.numberOfMedication = req.body.numberOfMedication;
      inventory.Ammunition.numberOfAmmunition = req.body.numberOfAmmunition;
      inventory
        .save()
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          return res.status(400).json(err);
        });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getInventoryBySurvivor: async (req, res) => {
    try {
      const survivor = await Survivor.findOne({
        _id: req.body.survivorId,
      });
      if (survivor.infected == false) {
        Inventory.findOne({ survivorId: req.body.survivorId })
          .then((data) => {
            res.json(data);
          })
          .catch((err) => {
            res.status(400).json(err);
          });
      } else {
        res.json("You are infected by virus");
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  trading: async (req, res) => {
    try {
      const survivor1Inventory = await Inventory.findOne({
        survivorId: req.body.survivor1,
      });
      const Inventories = await Inventory.find();
      let count = 0;
      const tradingData = Inventories.map((items) => {
        if (count == 0) {
          if (
            req.body.buy.numberOfWater <= items.water.numberOfWater &&
            req.body.buy.numberOfFood <= items.food.numberOfFood &&
            req.body.buy.numberOfMedication <=
              items.medication.numberOfMedication &&
            req.body.buy.numberOfAmmunition <=
              items.Ammunition.numberOfAmmunition
          ) {
            survivor1Inventory.water.numberOfWater =
              survivor1Inventory.water.numberOfWater +
              req.body.buy.numberOfWater -
              req.body.sell.numberOfWater;
            survivor1Inventory.food.numberOfFood =
              survivor1Inventory.food.numberOfFood +
              req.body.buy.numberOfFood -
              req.body.sell.numberOfFood;
            survivor1Inventory.medication.numberOfMedication =
              survivor1Inventory.medication.numberOfMedication +
              req.body.buy.numberOfMedication -
              req.body.sell.numberOfMedication;
            survivor1Inventory.Ammunition.numberOfAmmunition =
              survivor1Inventory.Ammunition.numberOfAmmunition +
              req.body.buy.numberOfAmmunition -
              req.body.sell.numberOfAmmunition;
            survivor1Inventory.save();
            items.water.numberOfWater =
              items.water.numberOfWater +
              req.body.sell.numberOfWater -
              req.body.buy.numberOfWater;
            items.food.numberOfFood =
              items.food.numberOfFood +
              req.body.sell.numberOfFood -
              req.body.buy.numberOfFood;
            items.medication.numberOfMedication =
              items.medication.numberOfMedication +
              req.body.sell.numberOfMedication -
              req.body.buy.numberOfMedication;
            items.Ammunition.numberOfAmmunition =
              items.Ammunition.numberOfAmmunition +
              req.body.sell.numberOfAmmunition -
              req.body.buy.numberOfAmmunition;
            items.save();
            count++;
            return {
              survivor1: survivor1Inventory,
              survivor2: items,
            };
          }
        } else {
          return;
        }
      });
      Promise.all(tradingData).then((data) => {
        const filteredData = data.filter((itemData) => {
          if (itemData !== undefined) {
            return itemData;
          }
        });
        res.json(filteredData);
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  averageOfResources: async (req, res) => {
    try {
      let totalWater = 0;
      let totalFood = 0;
      let totalMedication = 0;
      let totalAmmunition = 0;
      const inventory = await Inventory.find();
      inventory.map((items, i) => {
        totalWater = items.water.numberOfWater + totalWater;
        totalFood = items.food.numberOfFood + totalFood;
        totalMedication = items.medication.numberOfMedication + totalMedication;
        totalAmmunition = items.Ammunition.numberOfAmmunition + totalAmmunition;
        if (i == inventory.length - 1) {
          const waterAverage = totalWater / inventory.length;
          const foodAverage = totalFood / inventory.length;
          const medicationAverage = totalMedication / inventory.length;
          const ammunitionAverage = totalAmmunition / inventory.length;

          res.json({
            water: waterAverage,
            food: foodAverage,
            medication: medicationAverage,
            ammunition: ammunitionAverage,
          });
        }
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  lostPoints: async (req, res) => {
    try {
      let totalWater = 0;
      let totalFood = 0;
      let totalMedication = 0;
      let totalAmmunition = 0;
      const infectedSurvivors = await Survivor.find({ infected: true });
      if (infectedSurvivors.length !== 0) {
        infectedSurvivors.map(async (items, i) => {
          const inventory = await Inventory.findOne({ survivorId: items._id });

          totalWater = inventory.water.numberOfWater + totalWater;
          totalFood = inventory.food.numberOfFood + totalFood;
          totalMedication =
            inventory.medication.numberOfMedication + totalMedication;
          totalAmmunition =
            inventory.Ammunition.numberOfAmmunition + totalAmmunition;
          if (i == infectedSurvivors.length - 1) {
            const waterAverage = totalWater * 4;
            const foodAverage = totalFood * 3;
            const medicationAverage = totalMedication * 2;
            const ammunitionAverage = totalAmmunition * 1;

            res.json({
              water: waterAverage,
              food: foodAverage,
              medication: medicationAverage,
              ammunition: ammunitionAverage,
            });
          }
        });
      } else {
        res.json("There is no Infected survivor");
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};
