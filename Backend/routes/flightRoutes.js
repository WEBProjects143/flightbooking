const express = require("express");
const auth=require("../middlware/auth");
const { searchFlights,getFlightsById,flightList} = require("../controller/flightController");
const router = express.Router();

router.post("/search", searchFlights);
router.get("/:id", getFlightsById);
router.get("/lists",auth,flightList);

module.exports = router;
