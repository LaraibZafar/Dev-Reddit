import React, { useState } from "react";
import "./signup.styles.scss";

const Signup = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { name, email, password, confirmPassword } = userData;

  const onChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      console.log("Password doesn't match.");
    } else {
      console.log(userData);
    }
  };

  return (
    <div className="signup-container  container">
      <div className="signup-fields">
        <h1>SIGN UP</h1>
        <form className="forms" onSubmit={(event) => onSubmit(event)}>
          <input
            placeholder="Name"
            name="name"
            type="text"
            value={name}
            onChange={(event) => onChange(event)}
          />
          <input
            placeholder="Email"
            name="email"
            type="email"
            value={email}
            onChange={(event) => onChange(event)}
          />
          <input
            placeholder="Password"
            name="password"
            type="password"
            value={password}
            onChange={(event) => onChange(event)}
          />
          <input
            placeholder="Confirm Password"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(event) => onChange(event)}
          />
          <button type="submit" className="btn btn-primary">Sign Up</button>
        </form>
        
      </div>
    </div>
  );
};

export default Signup;
