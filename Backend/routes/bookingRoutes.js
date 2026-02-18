const express = require("express");
const Booking =require('.././model/Booking')
const { bookFlight } = require("../controller/bookingController");
const router = express.Router();

router.post("/book", bookFlight);
// Get booking  list 
router.get("/", async (req, res) => {
  const booking = await Booking.findAll();
  if (!booking) return res.status(404).json({ message: "Not found" });
  res.json(booking);
});


// Get booking by ID
router.get("/:id", async (req, res) => {
  const booking = await Booking.findByPk(req.params.id);
  if (!booking) return res.status(404).json({ message: "Not found" });
  res.json(booking);
});

// Update booking
router.put("/:id", async (req, res) => {
  const booking = await Booking.findByPk(req.params.id);
  if (!booking) return res.status(404).json({ message: "Not found" });

  await booking.update(req.body);
  res.json({ message: "Booking updated", booking });
});

// Cancel booking
router.patch("/cancel/:id", async (req, res) => {
  const booking = await Booking.findByPk(req.params.id);
  if (!booking) return res.status(404).json({ message: "Not found" });

  booking.status = "CANCELLED";
  await booking.save();

  res.json({ message: "Booking cancelled" });
});

// Delete booking permanently
router.delete("/:id", async (req, res) => {
  await Booking.destroy({ where: { id: req.params.id } });
  res.json({ message: "Booking deleted" });
});

module.exports = router;
