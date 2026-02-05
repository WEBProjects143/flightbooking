import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Signup() {
  const navigate=useNavigate();
  const submit = async (e) => {
    
    const email= e.target.email.value
    const  password = e.target.password.value

    if(!password  && !email){

      alert("please fill all fields")

      return 
      
    }
    e.preventDefault();

    await axios.post("http://localhost:4000/api/auth/signup", {
      email: e.target.email.value,
      password: e.target.password.value
    });
    alert("Signup successful");
    navigate(`/`)
  };

  return (
    <form className="auth-form" onSubmit={submit}>
      <h2>Signup</h2>
      <input name="email" placeholder="Email" />
      <input name="password" type="password" placeholder="Password" />
      <button>Signup</button>
    </form>
  );
}
