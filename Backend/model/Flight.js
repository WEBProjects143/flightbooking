const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Flight = sequelize.define("Flight", {
  airline: DataTypes.STRING,
  from: DataTypes.STRING,
  to: DataTypes.STRING,
  date: DataTypes.DATEONLY,
  price: DataTypes.INTEGER,
});

module.exports = Flight;
