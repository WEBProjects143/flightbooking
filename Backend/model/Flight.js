const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Flight = sequelize.define('flight', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    airline: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    from: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    to: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    flightNumber: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    departureTime: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    arrivalTime: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
  }, {
    tableName: 'flight',
    timestamps: true, // enables createdAt & updatedAt
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  });
 module.exports=Flight;


