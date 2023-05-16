const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const survivorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
  },
  lastLocation: {
    latitude: {
      type: String,
      required: true,
    },
    longitude: {
      type: String,
      required: true,
    },
  },
  infected: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Survivor", survivorSchema);
