const Booking = require("../model/Booking");

exports.bookFlight = async (req, res) => {
  const booking = await Booking.create(req.body);
  res.json({ message: "Booking successful", booking });
};
