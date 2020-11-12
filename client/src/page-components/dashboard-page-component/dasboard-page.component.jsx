import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./dasboard-page.styles.scss";

import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { getCurrentProfile } from "../../redux/profile-reducer/profile.actions";

import Spinner from "../../components/spinner-component/spinner.component";

const DashboardPage = ({
  profile: { profile, loading },
  auth: { user, isAuthenticated },
  getCurrentProfile,
}) => {
  useEffect(() => {
    if (isAuthenticated) getCurrentProfile();
  }, [isAuthenticated]);
  return profile === null && loading ? (
    <div className="dashboard-container-spinner">
      {" "}
      <Spinner className="spinner" />
    </div>
  ) : (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <p>
        {"    "}
        <i className="fas fa-user" />
        {"   "}Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <p>Has a profile</p>
      ) : (
        <div>
          <p>You haven't created a profile, please create one.</p>
          <Link className="btn btn-primary" to="/create-profile">
            Create Profile
          </Link>
        </div>
      )}
    </div>
  );
};
DashboardPage.prototype = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});
const mapDispatchToProps = (dispatch) => ({
  getCurrentProfile: () => dispatch(getCurrentProfile()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
