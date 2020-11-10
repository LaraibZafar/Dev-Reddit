import React, { useState } from "react";
import "./signup.styles.scss";

import PropTypes from "prop-types";

import {Redirect} from 'react-router-dom';


import { connect } from "react-redux";
import { setAlert } from "../../redux/alert-reducer/alert.actions";
import { registerUser } from "../../redux/auth-reducer/auth.actions";

const Signup = ({ setAlert, registerUser,isAuthenticated }) => {
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
  const onSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setAlert("Password doesn't match", "danger", 2000);
    } else {
      registerUser({name,email,password});
    }
  };

  if(isAuthenticated){
    return <Redirect to="/dashboard" />
  }
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
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};
//This prop is required and it has to be a function
//allows type checking in javascript
Signup.propTypes = {
  setAlert: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,

};

const mapStateToProps = (state)=>({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  setAlert: (message, alertType, displayTime) =>
    dispatch(setAlert(message, alertType, displayTime)),
  registerUser: (name, email, password) =>
    dispatch(registerUser(name, email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
