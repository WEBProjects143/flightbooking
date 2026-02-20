const express = require("express");
const Booking = require("../model/Booking");
const Flight = require("../model/Flight");
const User = require("../model/user");
const auth = require("../middlware/auth");
const { bookFlight } = require("../controller/bookingController");

const router = express.Router();

// Create booking
router.post("/book", bookFlight);

// Get bookings for logged-in user (My Tickets)
router.get("/my", auth, async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const bookings = await Booking.findAll({
      where: { email: user.email },
      include: { model: Flight, as: "Flight" },
      order: [["createdAt", "DESC"]],
    });

    if (!bookings || bookings.length === 0) {
      return res.json([]);
    }

    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get booking list (all bookings - admin/debug)
router.get("/", async (req, res) => {
  try {
    const booking = await Booking.findAll({
      include: { model: Flight, as: "Flight" },
    });
    if (!booking) return res.status(404).json({ message: "Not found" });
    res.json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get booking by ID (with flight details)
router.get("/:id", async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id, {
      include: { model: Flight, as: "Flight" },
    });
    if (!booking) return res.status(404).json({ message: "Not found" });
    res.json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update booking
router.put("/:id", async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) return res.status(404).json({ message: "Not found" });

    await booking.update(req.body);
    res.json({ message: "Booking updated", booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Cancel booking
router.patch("/cancel/:id", async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) return res.status(404).json({ message: "Not found" });

    booking.status = "CANCELLED";
    await booking.save();

    res.json({ message: "Booking cancelled" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete booking permanently
router.delete("/:id", async (req, res) => {
  try {
    await Booking.destroy({ where: { id: req.params.id } });
    res.json({ message: "Booking deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
