import React from "react";
import "../styles/LoginForm.css";

const LoginForm = () => {
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
      .then(() => window.location.reload())
      .catch((err) => console.log(err));
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <div>
      { token ? <button onClick={handleLogout}>Logout</button> : 
    <div className="login-page">
      <div className="form">
        <div className="login-form">
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
