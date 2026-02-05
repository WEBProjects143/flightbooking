const Flight = require("../model/Flight");

exports.searchFlights = async (req, res) => {
  const { from, to, date } = req.query;
  console.log("from" + from)
  const flights = await Flight.findAll({
    where: { from, to, date },
  });

  res.json(flights);
};
