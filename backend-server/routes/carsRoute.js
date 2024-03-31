const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const Location = require("../models/location")
require("dotenv").config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024
  }
})

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

router.delete("/deletecar/:id", async(req, res) => {
  try {
    const deletedCarGroup = await Car.findByIdAndDelete(req.params.id);
    if (!deletedCarGroup) {
      return res.status(404).json({ message: "Car not found." });
    }
    res.status(200).json({ message: "Car Group has been removed.", deletedCarGroup });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
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

  router.post("/addcar", upload.array("imageFiles", 3), async (req, res) => {
    try {
      const { makeModel, carGroup, acriss, priceAmount, batteryType, locationId } = req.body;
      const imageFiles = req.files;
  
      // Check for required fields
      if (!makeModel || !carGroup || !acriss || !priceAmount || !batteryType || !locationId || !imageFiles || !Array.isArray(imageFiles) || imageFiles.length === 0) {
        return res.status(400).json({ message: "Missing or invalid fields. Please provide all required fields and at least one image." });
      }
  
      // Upload images to Cloudinary
      const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        const uploadedImage = await cloudinary.uploader.upload(dataURI, {
          folder: "evCarHire/",
        });
        return uploadedImage.secure_url;
      });
  
      const imageURLs = await Promise.all(uploadPromises);
  
      // Find the location by ID
      const location = await Location.findById(locationId);
      if (!location) {
        return res.status(404).json({ error: 'Location not found' });
      }
  
      // Create a new car
      const car = new Car({
        makeModel,
        carGroup,
        acriss,
        priceAmount,
        batteryType,
        currentbookings: [],
        imageURLs,
        location: locationId,
      });
  
      const result = await car.save();
      
      // Update the location's carsAvailable array with the new car's ID
      location.carsAvailable.push(result._id);
      await location.save();
  
      res.status(201).json(result); // 201 for "Created" status
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });  


  // update car price

  router.put("/:id", async (req, res) => {
    try {
      const updateCarPrice = await Car.findByIdAndUpdate(req.params.id, { $set: req.body}, {new: true})
      res.status(200).json(updateCarPrice);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });  
  

module.exports = router;