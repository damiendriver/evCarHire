const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");

router.post("/bookcar", async (req, res) => {
  const { car, memberid, pickupdate, returndate, totaldays, totalprice } =
    req.body

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
    })

    const booking = await newbooking.save();
    res.send('Your Car has been Reserved');
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;

