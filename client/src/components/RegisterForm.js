import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginForm.css";


const RegisterForm = () => {
    const navigator = useNavigate();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const handleRegister = () => {
        if (email === "") {
            alert("Email is required");
            return;
        }
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        else 
        {
            fetch("/register", {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({ email, password}),
            })
                .then((res) => res.json())
                .then((data) => {localStorage.setItem("token", data.idToken)})
                .then(() => navigator("/"))
                .catch((err) => console.log(err));
        }
        
    };
  return (
    <div className="login-page">
      <div className="form">
        <div className="register-form">
          <input type="email" placeholder="Email address" required onChange={ 
            (e) => setEmail(e.target.value)
           }/>
          <input type="password" placeholder="Password" onChange={
            (e) => setPassword(e.target.value)
          }/>
          <input type="password" placeholder="Confirm Password" onChange={
            (e) => setConfirmPassword(e.target.value)
          } />
          <button onClick={handleRegister}>Create</button>
          <p className="message">
            Already registered?
            <a href="/login">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
