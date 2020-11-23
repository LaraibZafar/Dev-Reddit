import React, { useState } from "react";
import PropTypes from "prop-types";
import "./create-profile-page.styles.scss";
import { useEmptyProfileForm } from "../../Custom-Hook/Profile-Form-Hook";

import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { createProfile } from "../../redux/profile-reducer/profile.actions";

const CreateProfilePage = ({ createProfile, history }) => {
  const [formData, setFormData] = useEmptyProfileForm();
  const [displaySocials, toggleDisplaySocials] = useState(false);
  const {
    website,
    location,
    status,
    skills,
    gitHubUsername,
    bio,
    twitter,
    facebook,
    instagram,
    linkedin,
    youtube,
    company,
  } = formData;

  const onChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    createProfile(formData, history);
  };

  return (
    <div className="create-profile-container">
      <h1>Create Profile</h1>
      <form className="form" onSubmit={(event) => onSubmit(event)}>
        <div className="form-container">
          <div className="form-group-1">
            <div className="form-group">
              <select
                name="status"
                value={status}
                onChange={(event) => onChange(event)}
              >
                <option value="0">* Select Professional Status</option>
                <option value="Developer">Developer</option>
                <option value="Junior Developer">Junior Developer</option>
                <option value="Senior Developer">Senior Developer</option>
                <option value="Manager">Manager</option>
                <option value="Student">Student</option>
                <option value="Instructor">Instructor</option>
                <option value="Intern">Intern</option>
                <option value="Other">Other</option>
              </select>
              <small className="form-text">
                Give us an idea of where you are at in your career
              </small>
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Company"
                name="company"
                value={company}
                onChange={(event) => onChange(event)}
              />
              <small className="form-text">
                Could be your own company or one you work for
              </small>
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Website"
                name="website"
                value={website}
                onChange={(event) => onChange(event)}
              />
              <small className="form-text">
                Could be your own or a company website
              </small>
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Location"
                name="location"
                value={location}
                onChange={(event) => onChange(event)}
              />
              <small className="form-text">
                City & state suggested (eg. Boston, MA)
              </small>
            </div>
            <button
              type="button"
              onClick={() => toggleDisplaySocials(!displaySocials)}
              className="btn btn-primary"
            >
              Add Socials
            </button>
            {displaySocials ? (
              <div className="social-group">
                <div className="social-group-1">
                  <div className="form-group social-input">
                    <i className="fab fa-twitter fa-2x"></i>
                    <input
                      type="text"
                      placeholder="Twitter URL"
                      name="twitter"
                      value={twitter}
                      onChange={(event) => onChange(event)}
                    />
                  </div>
                  <div className="form-group social-input">
                    <i className="fab fa-facebook fa-2x"></i>
                    <input
                      type="text"
                      placeholder="Facebook URL"
                      name="facebook"
                      value={facebook}
                      onChange={(event) => onChange(event)}
                    />
                  </div>
                  <div className="form-group social-input">
                    <i className="fab fa-youtube fa-2x"></i>
                    <input
                      type="text"
                      placeholder="YouTube URL"
                      name="youtube"
                      value={youtube}
                      onChange={(event) => onChange(event)}
                    />
                  </div>
                </div>
                <div className="social-group-1">
                  <div className="form-group social-input">
                    <i className="fab fa-linkedin fa-2x"></i>
                    <input
                      type="text"
                      placeholder="Linkedin URL"
                      name="linkedin"
                      value={linkedin}
                      onChange={(event) => onChange(event)}
                    />
                  </div>
                  <div className="form-group social-input">
                    <i className="fab fa-instagram fa-2x"></i>
                    <input
                      type="text"
                      placeholder="Instagram URL"
                      name="instagram"
                      value={instagram}
                      onChange={(event) => onChange(event)}
                    />
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          <div className="form-group-2">
            <div className="form-group">
              <input
                type="text"
                placeholder="* Skills"
                name="skills"
                value={skills}
                onChange={(event) => onChange(event)}
              />
              <small className="form-text">
                Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
              </small>
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Github Username"
                name="gitHubUsername"
                value={gitHubUsername}
                onChange={(event) => onChange(event)}
              />
              <small className="form-text">
                If you want your latest repos and a Github link, include your
                username
              </small>
            </div>
            <div className="form-group">
              <textarea
                placeholder="A short bio of yourself"
                name="bio"
                value={bio}
                onChange={(event) => onChange(event)}
              ></textarea>
              <small className="form-text">
                Tell us a little about yourself
              </small>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <Link to="/dashboard" className="btn btn-secondary">
          Go Back
        </Link>
      </form>
    </div>
  );
};

CreateProfilePage.propTypes = {
  createProfile: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  createProfile: (formData, history, edit) =>
    dispatch(createProfile(formData, history, edit)),
});

export default connect(null, mapDispatchToProps)(withRouter(CreateProfilePage));
