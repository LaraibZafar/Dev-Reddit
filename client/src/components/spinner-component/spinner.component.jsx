import React from "react";
import "./spinner.styles.scss";

const Spinner = () => {
  return (
    <div class="spinner-border text-light spinner" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
