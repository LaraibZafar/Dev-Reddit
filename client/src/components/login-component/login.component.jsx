import React, { useState } from "react";
import "./login.styles.scss";

import PropTypes from "prop-types";

import {Redirect} from 'react-router-dom';

import {connect} from 'react-redux';
import {loginUser} from '../../redux/auth-reducer/auth.actions';

const Login = ({loginUser,isAuthenticated}) => {
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
    loginUser({email, password});
    
  };

  if(isAuthenticated){
    return <Redirect to="/" />
  }

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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state)=>({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps=(dispatch)=>({
  loginUser: (email,password)=>dispatch(loginUser(email,password)),
});

export default connect(mapStateToProps,mapDispatchToProps)(Login);
