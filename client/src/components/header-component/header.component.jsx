import React, { Fragment } from "react";
import "./header.styles.scss";

import { connect } from "react-redux";
import { logoutUser } from "../../redux/auth-reducer/auth.actions";

import PropTypes from "prop-types";

import { Link } from "react-router-dom";

const Header = ({ auth, logoutUser }) => {
  const { isAuthenticated, loading } = auth;
  const loggedInLinks = (
    <div className="link-container">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/developers">Developers</Link>
      <Link onClick={logoutUser} to="/">
        Logout
      </Link>
    </div>
  );
  const guestLinks = (
    <div className="link-container">
      <Link to="/developers">Developers</Link>
      <Link to="/signup">Register</Link>
      <Link to="/login">Login</Link>
    </div>
  );
  return (
    <div className="header-container">
      <Link to="/" className="logo-container">
        <i className="fas fa-code" />
        <h1>Dev-Reddit</h1>
      </Link>
      <Fragment>{isAuthenticated ? loggedInLinks : guestLinks}</Fragment>
    </div>
  );
};
Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  logoutUser: () => dispatch(logoutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
