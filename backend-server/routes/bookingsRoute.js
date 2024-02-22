const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const Car = require("../models/car");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

router.post("/bookcar", async (req, res) => {
  console.log(req.body);
  const {
    car,
    memberid,
    pickupdate,
    returndate,
    totaldays,
    totalprice,
    token,
  } = req.body;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    const payment = await stripe.charges.create(
      {
        amount: totalprice * 100,
        customer: customer.id,
        currency: "EUR",
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {
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

        return res.status(200).send("Payment Successful. Your car is booked.");
      } catch (error) {
        return res.status(400).json({ error });
      }
    }

    return res.status(400).send("Payment was not successfil. Please try again");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
