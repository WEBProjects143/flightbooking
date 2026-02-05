const express=require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const sequelize = require("./config/database");
const authRoutes = require("./routes/userloginandSignup");
const session = require("express-session");
const verify=require("./middlware/verify")
const app=express();


//Routes
const Router=require("./routes/paymentRoutes");
const flightRoutes = require("./routes/flightRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
//using buildin middlware to parse json coming from http requests

app.use(express.json());
app.use(cors({
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(session({
  secret: "session_secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false
  }
}));


//router
app.use(cookieParser())
app.use(Router)
app.use("/api/flights", flightRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/auth", authRoutes);

app.get("/",verify, (req,res)=>{
  res.json({ message: "Welcome to dashboard" });
})

sequelize.sync().then(() => {
  app.listen(4000, () => console.log("Backend running on port 4000"));
});