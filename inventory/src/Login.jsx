import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post("http://localhost:5000/api/login", {
      email,
      password,
    });

    if (!res.data.success) {
      alert(res.data.message);
      return;
    }

    const userData = res.data.user;

    setUser(userData);

    if (userData.role === "admin") {
      navigate("/admin");
    } else if (userData.role === "manager") {
      navigate("/admin");
    }

  } catch (err) {
    alert("Server error");
  }
};

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>

      <input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button id="butt" type="submit">Login</button>
    </form>
  );
}

export default Login;