import React from "react";
import "./header.styles.scss";

const Header = () => (
  <div className="header-container">
    <div className="logo-container">
      <i class="fas fa-code" />
      <h1>Dev-Reddit</h1>
    </div>
    <div className="link-container">
      <p>Developers</p>
      <p>Register</p>
      <p>Login</p>
    </div>
  </div>
);

export default Header;
