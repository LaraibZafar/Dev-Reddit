import React from "react";
import "./login.styles.scss";

const Login = () => {
  return (
    <div className="login-container  container">
      <div className="login-fields">
        <h1>SIGN IN</h1>
        <div className="forms">           
            <input placeholder="Email" />
            <input placeholder="Password" />   
        </div>
        <button className="btn btn-primary">Login</button>      
      </div>
    </div>
  );
};

export default Login;
