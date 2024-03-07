const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

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
      const imageFiles = req.files;
      const newCar = req.body;
      console.log("Request Body:", req.body);
      console.log("Uploaded Files:", imageFiles);
  
      if (!imageFiles || !Array.isArray(imageFiles)) {
        return res.status(400).json({ message: "No images uploaded." });
      }
  
      const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        const uploadedImage = await cloudinary.uploader.upload(dataURI);
        return uploadedImage.url;
      });
  
      const imageURLs = await Promise.all(uploadPromises);
  
      const car = new Car({
        makeModel: newCar.makeModel,
        carGroup: newCar.carGroup,
        acriss: newCar.acriss,
        priceAmount: newCar.priceAmount,
        batteryType: newCar.batteryType,
        currentbookings: [],
        imageURLs: imageURLs,
      });
  
      const result = await car.save();
      res.send(result);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error });
    }
  });

module.exports = router;