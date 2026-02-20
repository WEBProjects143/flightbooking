import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./FlightList.css";

const FlightList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/bookings/my",
          { withCredentials: true }
        );
        setBookings(res.data || []);
      } catch (error) {
        console.error(error);
        alert("Failed to load your tickets. Please login again.");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) {
      return;
    }

    try {
      await axios.patch(
        `http://localhost:4000/api/bookings/cancel/${id}`,
        {},
        { withCredentials: true }
      );

      setBookings((prev) =>
        prev.map((b) =>
          b.id === id ? { ...b, status: "CANCELLED" } : b
        )
      );

      alert("Booking cancelled.");
    } catch (error) {
      console.error(error);
      alert("Failed to cancel booking.");
    }
  };

  if (loading) {
    return (
      <div className="flight-container">
        <h2>Flight Ticket List</h2>
        <p>Loading your tickets...</p>
      </div>
    );
  }

  return (
    <div className="flight-container">
      <h2>My Tickets</h2>

      {bookings.length === 0 && (
        <p>You have no bookings yet.</p>
      )}

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
            <button
              className="cancel-button"
              onClick={() => handleCancel(booking.id)}
              disabled={booking.status === "CANCELLED"}
            >
              {booking.status === "CANCELLED" ? "Cancelled" : "Cancel"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlightList;
