import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  // 🔥 This gets previous page
  const from = location.state?.from?.pathname || "/";

  const submit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post(
        "http://localhost:4000/api/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      alert("Logged in successfully");

      // Notify Navbar that login was successful
      window.dispatchEvent(new Event("authStateChanged"));

      // 🔥 Redirect back to previous page
      navigate(from, { replace: true });

    } catch (error) {
      if (error.response?.status === 401) {
        alert("Invalid credentials");
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    <form className="auth-form" onSubmit={submit}>
      <h2>Login</h2>

      <input name="email" type="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Password" required />

      <button type="submit">Login</button>
    </form>
  );
}
