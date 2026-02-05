import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./Book.css";

const Book = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        passengerName: "",
        email: "",
    });

    const confirmBooking = async () => {
        if (!form.passengerName || !form.email) {
        alert("Fill all details");
        return;
        }

        await axios.post("http://localhost:4000/api/bookings/book", {
        passengerName: form.passengerName,
        email: form.email,
        flightId: id,
        });

        alert("Booking Confirmed!");
        navigate("/");
    };

    return (
        <div className="booking-container">
        <h2>Passenger Details</h2>

        <input
            type="text"
            placeholder="Passenger Name"
            onChange={e =>
            setForm({ ...form, passengerName: e.target.value })
            }
        />

        <input
            type="email"
            placeholder="Email"
            onChange={e =>
            setForm({ ...form, email: e.target.value })
            }
        />

        <button onClick={confirmBooking}>
            Confirm Booking
        </button>
        </div>
    );
};

export default Book;
