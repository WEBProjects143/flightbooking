import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Login() {
    const navigate=useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    const email= e.target.email.value
    const  password = e.target.password.value
    if(!password  && !email){

      alert("please fill all fields")

      return 
      
    }

    const res=await axios.post(
      "http://localhost:4000/api/auth/login",
      {
        email: email,
        password: password
      },
      { withCredentials: true }
    );
    alert("Logged in");
    localStorage.setItem("token", res.data.token);
    navigate(`/`)
  };

  return (
    <form className="auth-form" onSubmit={submit}>
      <h2>Login</h2>
      <input name="email" placeholder="Email" />
      <input name="password" type="password" placeholder="Password" />
      <button>Login</button>
    </form>
  );
}
