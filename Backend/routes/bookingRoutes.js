const express = require("express");
const { bookFlight } = require("../controller/bookingController");
const router = express.Router();

router.post("/book", bookFlight);

module.exports = router;
