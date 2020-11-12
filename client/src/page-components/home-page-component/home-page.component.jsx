import React from "react";
import "./home-page.styles.scss";

import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const Homepage = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div className="home-page-container">
      <div className="color-overlay" />
      <div className="center-text">
        <h1>Dev-Reddit</h1>
        <i className="fas fa-code" />
        <br />
        <div className="button-container">
          <Link to="/signup" className="btn btn-primary">
            Register
          </Link>
          <Link to="/login" className="btn btn-secondary">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Homepage);
