import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Payment.css";

const Payment = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/bookings/${bookingId}`,
          { withCredentials: true }
        );
        setBooking(res.data);
      } catch (error) {
        alert("Unable to load booking for payment");
        navigate("/tickets");
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId, navigate]);

  const handlePayment = async () => {
    if (!cardNumber.trim() || !expiry.trim() || !cvv.trim()) {
      alert("Please fill all payment details.");
      return;
    }

    setPaying(true);
    // Dummy payment flow – no real payment API call
    setTimeout(() => {
      alert("Payment successful! Your ticket is confirmed.");
      navigate("/tickets");
    }, 1000);
  };

  if (loading || !booking) {
    return (
      <div className="payment-container">
        <h2>Processing...</h2>
      </div>
    );
  }

  return (
    <div className="payment-container">
      <h2>Payment</h2>

      <div className="payment-summary">
        <h3>Booking Summary</h3>
        <p><strong>Passenger:</strong> {booking.passengerName}</p>
        <p><strong>Email:</strong> {booking.email}</p>
        <p><strong>Status:</strong> {booking.status}</p>

        {booking.Flight && (
          <>
            <p><strong>Airline:</strong> {booking.Flight.airline}</p>
            <p><strong>Route:</strong> {booking.Flight.from} → {booking.Flight.to}</p>
            <p><strong>Date:</strong> {booking.Flight.date}</p>
            <p><strong>Amount:</strong> ₹{booking.Flight.price}</p>
          </>
        )}
      </div>

      <div className="payment-form">
        <h3>Dummy Payment Details</h3>
        <input
          type="text"
          placeholder="Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
        <div className="payment-row">
          <input
            type="text"
            placeholder="MM/YY"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
          />
          <input
            type="text"
            placeholder="CVV"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
          />
        </div>
        <button
          className="pay-btn"
          onClick={handlePayment}
          disabled={
            paying ||
            !cardNumber.trim() ||
            !expiry.trim() ||
            !cvv.trim()
          }
        >
          {paying ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
};

export default Payment;

