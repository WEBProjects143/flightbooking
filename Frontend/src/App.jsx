import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./Components/Flightbooking/Flightbooking";
import Navbar from "./Components/Flightbooking/Navbar/Navbar";
import Footer from "./Components/Flightbooking/Footer/Footer";

import Results from "./Components/Flightbooking/Results";
import Book from "./Components/Flightbooking/Book";
import Signup from "./Components/Flightbooking/reg/register";
import Login from "./Components/Flightbooking/login/login";
import ProtectedRoute from "./Components/Flightbooking/protectRoutes"
import EditBooking from "./Components/Flightbooking/EditBooking";

import "./App.css";
import FlightList from "./Components/Flightbooking/FlightList";

function App() {
  return (
    <BrowserRouter>
    <Navbar />

      <Routes>
        <Route path="/" element={
           <ProtectedRoute>
            <Dashboard />
            </ProtectedRoute> 
          } />
        <Route path="/results" element={<Results />} />
        <Route path="/book/:id" element={<Book />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Edit" element={<EditBooking/>} />
        <Route path="/Tickets" element={<FlightList/>} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;