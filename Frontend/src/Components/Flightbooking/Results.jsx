import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Results.css";

const Results = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  const [params] = useSearchParams();
  const navigate = useNavigate();

  const from = params.get("from");
  const to = params.get("to");
  const date = params.get("date");

  useEffect(() => {
    if (!from || !to || !date) {
      setLoading(false);
      return;
    }

    axios
      .post(
        "http://localhost:4000/api/flights/search",
        { from, to, date },
        { withCredentials: true }
      )
      .then(res => {
        setFlights(res.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err.response?.data || err.message);
        setLoading(false);
      });
  }, [from, to, date]);
  console.log(flights)
  if (loading) return <h3>Loading flights...</h3>;

  return (
    <div className="results-container">
      <h2>Available Flights</h2>

      {flights.length === 0 && <p>No flights found.</p>}

      {flights.map(flight => (
        <div className="flight-card" key={flight.id}>
          <div>
            <h3>{flight.airline}</h3>
            <p>{flight.from} → {flight.to}</p>
            <p>Date: {flight.date}</p>
          </div>

          <div>
            <h3>₹ {flight.price}</h3>
            <button onClick={() => navigate(`/book/${flight.id}`)}>
              Book Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Results;
