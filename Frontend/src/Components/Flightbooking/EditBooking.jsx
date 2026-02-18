import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditBooking.css";

const EditBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [flights, setflights] = useState(null);

useEffect(() => {
  const fetchBooking = async () => {   
    try {
         const res = await axios.get(
        `http://localhost:4000/api/bookings/books`
      );
      const fly=await axios.get(`http://localhost:4000/api/flights/books`);
 console.log(fly)
      setBooking(res.data[0]);
      // console.log(booking)
      setLoading(false);
    } catch (error) {

         alert("Booking not found");
      navigate("/");
    }
  };

  fetchBooking();
}, [id, navigate]);


  const updateBooking = async () => {
    await axios.put(
      `http://localhost:4000/api/bookings/${id}`,
      booking
    );
    alert("Booking Updated!");
    navigate("/");
  };

  const cancelBooking = async () => {
    await axios.patch(
      `http://localhost:4000/api/bookings/cancel/${id}`
    );
    alert("Booking Cancelled!");
    navigate("/");
  };

  const deleteBooking = async () => {
    await axios.delete(
      `http://localhost:4000/api/bookings/${id}`
    );
    alert("Booking Deleted!");
    navigate("/");
  };

  if (loading) {
    return (
    <>
    <h2>Loading...</h2>
    </>)}

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
        <label>Flight Details</label>
      <p><strong>Airline:</strong></p>
      <p><strong>From:</strong></p>
      <p><strong>To:</strong> </p>
      <p><strong>Date:</strong> </p>
      <p><strong>Price:</strong> ₹</p>

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
