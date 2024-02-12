const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
  {
    car: {
      type: String,
      required: true
    },
    carid: {
      type: String,
      required: true
    },
    memberid: {
      type: String,
      required: true
    },
    pickupdate: {
      type: String,
      required: true
    },
    returndate: {
      type: String,
      required: true
    },
    totalprice: {
      type: Number,
      required: true
    },
    totaldays: {
      type: Number,
      required: true
    },
    transactionid: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true,
      default: "reserved"
    },
  },
  {
    timestamps: true
  }
);

const bookingModel = mongoose.model('booking', bookingSchema)

module.exports = bookingModel