const { DataTypes, DATE } = require("sequelize");
const sequelize = require("../config/database");

const Booking = sequelize.define("Bookings", {
  passengerName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  flightId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt:{
    type:DataTypes.DATE,
    defaultValue:DataTypes.NOW, 
  },
  updatedAt:{
    type:DataTypes.DATE,
    defaultValue:DataTypes.NOW, 
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "CONFIRMED", // CONFIRMED | CANCELLED
  },
});

module.exports = Booking;
