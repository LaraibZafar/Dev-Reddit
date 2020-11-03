import React from "react";
import "./signup-page.styles.scss";

import Particles from "react-particles-js";
import particleParams from "../../assets/particlesjs-config.json";

import Signup from "../../components/signup-component/signup.component";

const SignupPage = () => {
  return (
    <div className="signup-page-container">
      <Particles className="params" params={particleParams} />
      <Signup />
    </div>
  );
};
export default SignupPage;
