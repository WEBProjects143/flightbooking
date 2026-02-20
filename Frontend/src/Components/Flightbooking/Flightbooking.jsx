import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FB.css";

const indianAirports = [
  { name: "Indira Gandhi International Airport", code: "DEL" },
  { name: "Chhatrapati Shivaji Maharaj International Airport", code: "BOM" },
  { name: "Chennai International Airport", code: "MAA" },
  { name: "Kempegowda International Airport", code: "BLR" },
  { name: "Rajiv Gandhi International Airport", code: "HYD" },
  { name: "Netaji Subhas Chandra Bose International Airport", code: "CCU" },
  { name: "Cochin International Airport", code: "COK" },
  { name: "Sardar Vallabhbhai Patel International Airport", code: "AMD" },
  { name: "Goa International Airport", code: "GOI" },
];

const Dashboard = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    from: "",
    to: "",
    date: "",
    returnDate:""
  });

  const searchFlights = () => {
    if (!form.from || !form.to || !form.date) {
      alert("Please fill all fields");
      return;
    }

    if (form.from === form.to) {
      alert("From and To locations must be different");
      return;
    }

    navigate(
      `/results?from=${form.from}&to=${form.to}&date=${form.date}`
    );
  };

  return (
    <>

      {/* MAIN SEARCH */}
      <div className="dashboard">

        {/* Trip Type */}
        <div className="trip-type">
          <label><input type="radio" name="trip" defaultChecked /> One Way</label>
          <label><input type="radio" name="trip" /> Round Trip</label>
          <label><input type="radio" name="trip" /> Multi City</label>
        </div>

        {/* Search Card */}
        <div className="search-card">

          <div className="field">
            <span>From</span>
            <select
              value={form.from}
              onChange={e => setForm({ ...form, from: e.target.value })}
            >
              <option value="">Select City</option>
              {indianAirports
                .filter(port => port.code !== form.to)
                .map(port => (
                  <option key={port.code} value={port.code}>
                    {port.name} ({port.code})
                  </option>
                ))}
            </select>
          </div>

          <div className="swap">⇄</div>

          <div className="field">
            <span>To</span>
            <select
              value={form.to}
              onChange={e => setForm({ ...form, to: e.target.value })}
            >
              <option value="">Select City</option>
              {indianAirports
                .filter(port => port.code !== form.from)
                .map(port => (
                  <option key={port.code} value={port.code}>
                    {port.name} ({port.code})
                  </option>
                ))}
            </select>
          </div>

          <div className="field">
            <span>Departure</span>
            <input
              type="date"
              onChange={e => setForm({ ...form, date: e.target.value })}
            />
          </div>

          <div className="field">
            <span>Return</span>
            <input type="date" 
            onChange={e => setForm({ ...form, returndate: e.target.value })}
            />
          </div>

          <div className="field">
            <span>Travellers & Class</span>
            <select>
              <option>1 Traveller, Economy</option>
              <option>2 Travellers, Economy</option>
              <option>Business Class</option>
            </select>
          </div>

        </div>

        <button className="search-btn" onClick={searchFlights}>
          SEARCH
        </button>
      </div>
    </>
  );
};

export default Dashboard;
