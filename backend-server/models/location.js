const mongoose = require("mongoose");

const locationSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    eircode: {
      type: String,
      required: true,
    },

    town: {
      type: String,
      required: true,
    },

    latitude: {
      type: Number,
      required: true,
    },

    longitude: {
      type: Number,
      required: true,
    },

    openHours: {
      type: String,
      required: true,
    },

    carsAvailable: [{ type: mongoose.Schema.Types.ObjectId, ref: "Car" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(`Location`, locationSchema);
