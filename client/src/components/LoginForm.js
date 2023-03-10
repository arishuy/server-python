import React from "react";
import "../styles/LoginForm.css";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigation = useNavigate();
  const token = localStorage.getItem("token");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const handleLogin = () => {
    fetch("/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {localStorage.setItem("token", data.idToken)
      console.log(data)} )
      .then(() => navigation("/"))
      .catch((err) => console.log(err));
  };
  
  return (
    <div>
      { token ? <button>Logout</button> : 
    <div className="login-page">
      <div className="login-picture">
      <i className="fa-regular fa-user"></i>
        </div>
      <div className="form">
        <div className="login-form">
          <h1>Web IoT</h1>
          <input type="text" placeholder="Username" onChange={
            (e) => setEmail(e.target.value)
          }/>
          <input type="password" placeholder="Password" 
          onChange={
            (e) => setPassword(e.target.value)
          }/>
          <button onClick={handleLogin}>Login</button>
          <p className="message">
            Not registered? <a href="/register">Create an account</a>
          </p>
        </div>
      </div>
    </div>
    }
    </div>
  );
};

export default LoginForm;
