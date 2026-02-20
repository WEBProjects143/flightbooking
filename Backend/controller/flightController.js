const Flight=require("../model/Flight");

exports.searchFlights = async (req, res) => {
  try {
    const { from, to, date } = req.body;

    if (!from || !to || !date) {
      return res.status(400).json({ message: "from, to and date are required" });
    }

    const flights = await Flight.findAll({
      where: { from, to, date },
    });

    return res.json(flights);
  } catch (error) {
    console.error("Error searching flights:", error);
    return res.status(500).json({ message: "Error searching flights" });
  }
};
exports.getFlightsById = async (req, res) => {
  try {
    const flight = await Flight.findByPk(req.params.id);

    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }

    res.json(flight);
  } catch (error) {
    console.error("Error fetching flight by id:", error);
    res.status(500).json({ message: "Error fetching flight" });
  }
};

exports.flightList = async (req, res) => {
  try {
    // Currently returns all flights for authenticated users.
    const flights = await Flight.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.json(flights);
  } catch (error) {
    console.error("Error fetching flight list:", error);
    res.status(500).json({ message: "Error fetching flight list" });
  }
};