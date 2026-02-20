import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Book.css";

const Book = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        passengerName: "",
        email: "",
    });

    const [flight, setFlight] = useState(null);

    useEffect(() => {
        const fetchFlight = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:4000/api/flights/${id}`
                );
                setFlight(res.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchFlight();
    }, [id]);

    const confirmBooking = async () => {
        if (!form.passengerName || !form.email) {
        alert("Fill all details");
        return;
        }
        try {
              const res = await axios.post(
                "http://localhost:4000/api/bookings/book",
                {
                  passengerName: form.passengerName,
                  email: form.email,
                  flightId: id,
                  status:"CONFIRMED"
                },
                { withCredentials: true }
              );

              const bookingId = res.data?.booking?.id;

              if (bookingId) {
                navigate(`/payment/${bookingId}`);
              } else {
                alert("Booking confirmed, but unable to redirect to payment.");
                navigate("/tickets");
              }
            
        } catch (error) {
            if (error.response && error.response.status === 401) {
            alert("Please login to continue booking");
            navigate("/login");
        }
        }
      
    };

    return (
        <div className="booking-container">
        <h2>Passenger Details</h2>

        {flight && (
          <div className="flight-summary">
            <h3>{flight.airline}</h3>
            <p>{flight.from} → {flight.to}</p>
            <p>Date: {flight.date}</p>
            <p>Price: ₹{flight.price}</p>
          </div>
        )}

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
