import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./Components/Flightbooking/Flightbooking";
import Navbar from "./Components/Flightbooking/Navbar/Navbar";
import Footer from "./Components/Flightbooking/Footer/Footer";

import Results from "./Components/Flightbooking/Results";
import Book from "./Components/Flightbooking/Book";
import Signup from "./Components/Flightbooking/reg/register";
import Login from "./Components/Flightbooking/login/login";
import EditBooking from "./Components/Flightbooking/EditBooking";
import ProtectLogin from "./Components/Flightbooking/Protectlogin";
import FlightList from "./Components/Flightbooking/FlightList";
import Payment from "./Components/Flightbooking/Payment";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/results" element={<Results />} />
        <Route
          path="/book/:id"
          element={
            <ProtectLogin>
              <Book />
            </ProtectLogin>
          }
        />
        <Route
          path="/tickets"
          element={
            <ProtectLogin>
              <FlightList />
            </ProtectLogin>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectLogin>
              <EditBooking />
            </ProtectLogin>
          }
        />
        <Route
          path="/payment/:bookingId"
          element={
            <ProtectLogin>
              <Payment />
            </ProtectLogin>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;