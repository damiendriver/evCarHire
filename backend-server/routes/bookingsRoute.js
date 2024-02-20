const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const Car = require("../models/car");
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);


router.post("/bookcar", async (req, res) => {
  console.log(req.body);
  const { car, memberid, pickupdate, returndate, totaldays, totalprice } =
    req.body;

  try {
    const newbooking = new Booking({
      car: car.makeModel,
      carid: car._id,
      memberid,
      pickupdate,
      returndate,
      totaldays,
      totalprice,
      transactionid: "1234",
    });

    const booking = await newbooking.save();

    const carstatus = await Car.findOne({ _id: car._id });

    carstatus.currentbookings.push({
      bookingid: booking._id,
      pickupdate: pickupdate,
      returndate: returndate,
      memberid: memberid,
      status: booking.status,
    });

    await carstatus.save();

    res.send("Your Car has been Reserved");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
