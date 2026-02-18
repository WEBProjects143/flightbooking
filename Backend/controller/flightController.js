const Flight = require("../model/Flight");
const auth=require("../middlware/auth");

exports.searchFlights = async (req, res) => {
  const { from, to, date } = req.query;
  const flights = await Flight.findAll();

  res.json(flights);
};
exports.getFlightsById= async (req, res) => {

  const flights = await Flight.findByPk(req.params.id);

  res.json(flights);
};

exports.flightList= async (req, res) => {
  const userId =req.userId
  console.log(userId)
  // res.json(newFlight);
};