const express = require('express');
const axios = require('axios');
const router = express.Router();
require("dotenv").config();

router.get('/chargepoints', async (req, res) => {
  try {
    const charge_mapUrl = process.env.OPEN_CHARGE_MAP_API_URL;
    const response = await axios.get(charge_mapUrl);
    const chargePoints = response.data;
    res.json(chargePoints);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
