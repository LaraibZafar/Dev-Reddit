import React from "react";
import "./spinner.styles.scss";

const Spinner = () => {
  return (
    <div className="spinner-border text-light spinner" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
