const Booking = require("../model/Booking");

exports.bookFlight = async (req, res) => {
  try {
    const { passengerName, email, flightId, status } = req.body;

    if (!passengerName || !email || !flightId) {
      return res
        .status(400)
        .json({ message: "passengerName, email and flightId are required" });
    }

    const booking = await Booking.create({
      passengerName,
      email,
      flightId,
      status: status || "CONFIRMED",
    });

    res.json({ message: "Booking successful", booking });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Error creating booking" });
  }
};
