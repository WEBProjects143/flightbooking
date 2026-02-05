const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Booking = sequelize.define("Booking", {
  passengerName: DataTypes.STRING,
  email: DataTypes.STRING,
  flightId: DataTypes.INTEGER,
});

module.exports = Booking;
