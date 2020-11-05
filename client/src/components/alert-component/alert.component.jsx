import React from "react";
import './alert.styles.scss';

import { connect } from "react-redux";

import PropTypes from "prop-types";

const Alert = ({ alerts }) => {
  if (alerts !== null && alerts.length > 0) {
      //mapping over so should put a key
      return alerts.map((alert) => (
       <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.message}
      </div>
    ));
  }
  return null;
};

const mapStateToProps = (state) => ({
  alerts: state.alert
});

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(Alert);
