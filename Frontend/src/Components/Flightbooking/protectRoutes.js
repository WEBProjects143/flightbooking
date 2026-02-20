import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const protect= ({ children }) => {
    const navigate=useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

if (!token) return null;
  return children;
};

export default protect;