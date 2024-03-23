const express = require("express");
const router = express.Router();
const Location = require("../models/location")

router.get("/getalllocations", async(req, res) => {

    try {
        const locations = await Location.find({})
        res.send(locations);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

// Route to get location names with _id field
router.get("/getlocationbyname", async (req, res) => {
    try {
        const locations = await Location.find({}, 'name');
        res.send(locations);
    } catch (error) {
        console.error("Error fetching locations:", error);
        return res.status(400).json({ message: "Error fetching locations" });
    }
});


router.get("/countbylocations", async(req, res) => {
    try {
        const rosslareCount = await Location.countDocuments({town:"Rosslare"})
        const wexfordCount = await Location.countDocuments({town:"Wexford"})
        res.status(200).json([
            {town:"Rosslare", count:rosslareCount},
            {town:"Wexford", count:wexfordCount}
        ]);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

module.exports = router;