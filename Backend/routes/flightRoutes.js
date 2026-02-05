const express = require("express");
const { searchFlights } = require("../controller/flightController");
const router = express.Router();

router.get("/search", searchFlights);

module.exports = router;
