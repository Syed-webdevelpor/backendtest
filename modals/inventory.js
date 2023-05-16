const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const inventorySchema = new Schema({
  survivorId: {
    type: ObjectId,
    ref: "Survivor",
  },
  water: {
    numberOfWater: { type: Number, required: true, default: 0 },
    points: {
      type: Number,
      default: 4,
    },
  },
  food: {
    numberOfFood: { type: Number, required: true, default: 0 },
    points: {
      type: Number,
      default: 3,
    },
  },
  medication: {
    numberOfMedication: { type: Number, required: true, default: 0 },
    points: {
      type: Number,
      default: 2,
    },
  },
  Ammunition: {
    numberOfAmmunition: { type: Number, required: true, default: 0 },
    points: {
      type: Number,
      default: 1,
    },
  },
});

module.exports = mongoose.model("Inventory", inventorySchema);
