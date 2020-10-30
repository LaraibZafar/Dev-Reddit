import React, { useState } from "react";
import "./login.styles.scss";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: ""
  });
  const {email, password} = userData;

  const onChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    console.log(userData)
    
  };
  return (
    <div className="login-container  container">
      <div className="login-fields">
        <h1>SIGN IN</h1>
        <form className="forms" onSubmit={(event) => onSubmit(event)}>           
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
            <button type="submit" className="btn btn-primary">Login</button>   
        </form>
           
      </div>
    </div>
  );
};

export default Login;
