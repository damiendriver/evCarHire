const express = require("express");
const router = express.Router();

const Car = require("../models/car")

router.get("/getallcars", async(req, res) => {

    try {
        const cars = await Car.find({})
        res.send(cars);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.post("/getcarbyid", async(req, res) => {

    const carid = req.body.carid

    try {
        const car = await Car.findOne({_id : carid})
        res.send(car);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.post("/getallcars", async (req, res) => {
    try {
      const cars = await Car.find();
      res.send(cars);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error });
    }
  });

  router.post("/addcar", async (req, res) => {
    try {
      const newCar = req.body;
      console.log(req.body);
      const car = new Car();
      car.makeModel = newCar.makeModel;
      car.carGroup = newCar.carGroup;
      car.acriss = newCar.acriss;
      car.priceAmount = newCar.priceAmount;
      car.batteryType = newCar.batteryType;
      car.currentbookings = [];
      if (newCar.imageURL1 && newCar.imageURL1.length > 0) {
        car.imageURLs.push(newCar.imageURL1);
      }
      if (newCar.imageURL2 && newCar.imageURL2.length > 0) {
        car.imageURLs.push(newCar.imageURL2);
      }
      if (newCar.imageURL3 && newCar.imageURL3.length > 0) {
        car.imageURLs.push(newCar.imageURL3);
      }
  
      const result = await car.save();
      res.send(result);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error });
    }
  });

module.exports = router;