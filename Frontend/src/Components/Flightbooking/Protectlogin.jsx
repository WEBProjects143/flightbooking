import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:4000/api/auth/check", {
      withCredentials: true,
    })
    .then(() => {
      setLoading(false);
    })
    .catch(() => {
      navigate("/login", { state: { from: location } });
    });
  }, []);

  if (loading) return <p>Checking authentication...</p>;

  return children;
};

export default ProtectedRoute;
