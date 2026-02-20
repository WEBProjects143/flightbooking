const express=require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const sequelize = require("./config/database");
const authRoutes = require("./routes/userloginandSignup");
const session = require("express-session");
const verify = require("./middlware/verify");
const Flight = require("./model/Flight");
const Booking = require("./model/Booking");

const app = express();


//Routes
const Router=require("./routes/paymentRoutes");
const flightRoutes = require("./routes/flightRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
//using buildin middlware to parse json coming from http requests

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use(
  session({
    secret: "super_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // true only in HTTPS production
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    },
  })
);


//router
app.use(cookieParser());
app.use(Router);
app.use("/api/flights", flightRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/auth", authRoutes);

app.get("/", verify, (req, res) => {
  res.json({ message: "Welcome to dashboard" });
});

app.get("/api/auth/check", (req, res) => {
  if (req.session.user) {
    return res.json({ loggedIn: true, user: req.session.user });
  }
  return res.status(401).json({ message: "Not logged in" });
});

// Define model associations before sync
Flight.hasMany(Booking, { foreignKey: "flightId" });
Booking.belongsTo(Flight, { foreignKey: "flightId", as: "Flight" });

sequelize.sync().then(() => {
  app.listen(4000, () => console.log("Backend running on port 4000"));
});