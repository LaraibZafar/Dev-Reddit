import React from "react";
import "./header.styles.scss";

import {Link} from 'react-router-dom';

const Header = () => (
  <div className="header-container">
    <Link to="/" className="logo-container">
      <i class="fas fa-code" />
      <h1>Dev-Reddit</h1>
    </Link>
    <div className="link-container">
      <Link to="/developers">Developers</Link>
      <Link to="/signup">Register</Link>
      <Link to="/login">Login</Link>
    </div>
  </div>
);

export default Header;
