import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthStatus();

    // Listen for auth state changes (login/logout)
    const handleAuthChange = () => {
      checkAuthStatus();
    };

    window.addEventListener("authStateChanged", handleAuthChange);

    return () => {
      window.removeEventListener("authStateChanged", handleAuthChange);
    };
  }, []);

  const handleServiceComingSoon = (serviceName) => {
    alert(`${serviceName} service is not started yet. Please check back later.`);
  };

  const checkAuthStatus = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/auth/check", {
        withCredentials: true,
      });
      if (res.data.loggedIn) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      setIsLoggedIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:4000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      setIsLoggedIn(false);
      
      // Notify other components about logout
      window.dispatchEvent(new Event("authStateChanged"));
      
      alert("Logged out successfully");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      alert("Failed to logout");
    }
  };

  return (
    <nav className="navbar">
      <h2 className="logo">makeMyTrip</h2>

      <ul className="nav-links">
        <li><a href="/">Flights</a></li>
        <li onClick={() => handleServiceComingSoon("Hotels")}>Hotels</li>
        <li onClick={() => handleServiceComingSoon("Trains")}>Trains</li>
        <li onClick={() => handleServiceComingSoon("Buses")}>Buses</li>
        <li onClick={() => handleServiceComingSoon("Cabs")}>Cabs</li>
        <li><a href="/tickets">Tickets</a></li>
      </ul>

      {isLoggedIn ? (
        <button className="login-btn" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <button className="login-btn">
          <a href="/login">Login</a> / <a href="/signup">Signup</a>
        </button>
      )}
    </nav>
  );
};

export default Navbar;