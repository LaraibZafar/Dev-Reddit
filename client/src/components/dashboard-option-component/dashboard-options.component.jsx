import React from "react";
import "./dashboard-options.styles.scss";
import { Link } from "react-router-dom";

const DashboardOptions = () => {
  return (
    <div className="options-container">
      <Link to="/edit-profile" className="btn btn-primary">
        <i className="fas fa-user-circle "></i>
        Edit Profile
      </Link>
      <Link to="/add-experience" className="btn btn-primary">
        <i className="fab fa-black-tie "></i>
        Add Experience
      </Link>
      <Link to="/add-education" className="btn btn-primary">
        <i className="fas fa-graduation-cap "></i>
        Add Education
      </Link>
    </div>
  );
};

export default DashboardOptions;
