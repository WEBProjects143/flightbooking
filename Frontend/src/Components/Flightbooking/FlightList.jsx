import { useEffect, useState } from "react";
import axios from "axios";
import "./FlightList.css";

const FlightList = () => {
  const [bookings, setBookings] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const [bookingRes, flightRes] = await Promise.all([
        axios.get("http://localhost:4000/api/bookings"),
        axios.get("http://localhost:4000/api/flights/lists"),
      ]);
      console.log(flightRes)
      console.log(bookingRes)
      const bookings = bookingRes.data;
      const flights = flightRes.data;

      // Merge both based on flightId
      const mergedData = bookings.map((booking) => {
        const flightDetails = flights.filter(
          (flight) => flight.id === booking.flightId
        );

        return {
          ...booking,
          flight: flightDetails || null,
        };
      });

      setBookings(mergedData);
    } catch (error) {
      console.error(error);
    }
  };

  fetchData();
}, []);

console.log(setBookings)

  const handleEdit = (id) => {
    alert("Edit booking ID: " + id);
    // or navigate(`/edit-booking/${id}`);
  };

  return (
    <div className="flight-container">
      <h2>Flight Ticket List</h2>

      {bookings.map((booking) => (
        <div className="flight-row" key={booking.id}>
          <div className="user-info">
            <h4>{booking.passengerName}</h4>
            <p>{booking.email}</p>
            <p>Status: {booking.status}</p>
          </div>

          <div className="flight-info">
            <p><strong>Airline:</strong> {booking.Flight?.airline}</p>
            <p><strong>From:</strong> {booking.Flight?.from}</p>
            <p><strong>To:</strong> {booking.Flight?.to}</p>
            <p><strong>Date:</strong> {booking.Flight?.date}</p>
            <p><strong>Price:</strong> ₹{booking.Flight?.price}</p>
          </div>

          <div className="action">
            <button onClick={() => handleEdit(booking.id)}>
              Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlightList;
