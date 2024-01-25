const mongoose = require(`mongoose`);

const carsSchema = mongoose.Schema({
  makeModel: {
    type: String,
    required: true,
  },
  carGroup: {
    type: String,
    required: true,
  },
  acriss: {
    type: String,
    required: true,
  },
  priceAmount: {
    type: Number,
    required: true,
  },
  imageURLs: {
    type: [String],
    default: [],
  },
  batteryType: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model(`Car`, carsSchema);
