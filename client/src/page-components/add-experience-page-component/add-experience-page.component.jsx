import React from "react";
import PropTypes from "prop-types";
import "./add-experience-page.styles.scss";
const AddExperience = (props) => {
  return (
    <div className="experience-container">
      <h1>Add An Experience</h1>
      <p>
        <i className="fas fa-code-branch"></i> Add any Developer positions
        you've worked in
      </p>
      <form className="form-container">
        <div className="form-group-1">
          <input placeholder="Job Title" name="jobTitle" />
          <input placeholder="Company" name="company" />
          <input placeholder="Location" name="location" />
          <textarea
            type="text"
            placeholder="Job Description"
            name="jobDescription"
            cols="30"
            rows="5"
          />
        </div>
        <div className="form-group-2">
          <div className="date-form">
            <h6>From Date</h6>
            <input type="date" name="from" />
          </div>
          <div>
            <div className="check-box">
              <p>Current Job </p>
              <input type="checkbox" name="current" value="" />
            </div>
          </div>
          <div className="date-form">
            <h6>To Date</h6>
            <input type="date" name="to" />
          </div>
        </div>
      </form>
    </div>
  );
};

AddExperience.propTypes = {};

export default AddExperience;
