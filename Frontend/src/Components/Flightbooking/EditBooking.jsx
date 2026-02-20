import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditBooking.css";

const EditBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/bookings/${id}`,
          { withCredentials: true }
        );
        setBooking(res.data);
        setLoading(false);
      } catch (error) {
        alert("Booking not found");
        navigate("/tickets");
      }
    };

    fetchBooking();
  }, [id, navigate]);

  const updateBooking = async () => {
    try {
      await axios.put(
        `http://localhost:4000/api/bookings/${id}`,
        {
          passengerName: booking.passengerName,
          email: booking.email,
        },
        { withCredentials: true }
      );
      alert("Booking Updated!");
      navigate("/tickets");
    } catch (error) {
      alert("Failed to update booking");
    }
  };

  const cancelBooking = async () => {
    try {
      await axios.patch(
        `http://localhost:4000/api/bookings/cancel/${id}`,
        {},
        { withCredentials: true }
      );
      alert("Booking Cancelled!");
      navigate("/tickets");
    } catch (error) {
      alert("Failed to cancel booking");
    }
  };

  const deleteBooking = async () => {
    try {
      await axios.delete(
        `http://localhost:4000/api/bookings/${id}`,
        { withCredentials: true }
      );
      alert("Booking Deleted!");
      navigate("/tickets");
    } catch (error) {
      alert("Failed to delete booking");
    }
  };

  if (loading || !booking) {
    return (
      <>
        <h2>Loading...</h2>
      </>
    );
  }

  return (
    <div className="edit-container">
      <h2>Edit Booking</h2>

      <label>Passenger Name</label>
      <input
        type="text"
        value={booking.passengerName}
        onChange={(e) =>
          setBooking({ ...booking, passengerName: e.target.value })
        }
      />

      <label>Email</label>
      <input
        type="email"
        value={booking.email}
        onChange={(e) =>
          setBooking({ ...booking, email: e.target.value })
        }
      />

      <label>Status</label>
      <input type="text" value={booking.status} disabled />

      <div className="ticket-details">
        <h3>Ticket Details</h3>
        {booking.Flight ? (
          <>
            <p><strong>Airline:</strong> {booking.Flight.airline}</p>
            <p><strong>From:</strong> {booking.Flight.from}</p>
            <p><strong>To:</strong> {booking.Flight.to}</p>
            <p><strong>Date:</strong> {booking.Flight.date}</p>
            <p><strong>Price:</strong> ₹{booking.Flight.price}</p>
          </>
        ) : (
          <p>No flight details available for this booking.</p>
        )}
      </div>

      <div className="button-group">
        <button className="update-btn" onClick={updateBooking}>
          Update
        </button>

        <button className="cancel-btn" onClick={cancelBooking}>
          Cancel Booking
        </button>

        <button className="delete-btn" onClick={deleteBooking}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default EditBooking;
