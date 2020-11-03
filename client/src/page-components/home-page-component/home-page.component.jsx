import React from 'react'
import "./home-page.styles.scss"

import Particles from "react-particles-js";
import particleParams from "../../assets/particlesjs-config.json";

import {Link} from 'react-router-dom';

const Homepage = () => (
        <div className="home-page-container">   
                <Particles className="params" params={particleParams} />
               <div className="color-overlay" />
                <div className="center-text">
                <h1>Dev-Reddit</h1>
                <i className="fas fa-code" />
                <br />
                <div className="button-container">
                <Link to="/signup" className="btn btn-primary">Register</Link>
                <Link to="/login" className="btn btn-secondary">Login</Link>
                </div>
                </div>
        </div>
    );

export default Homepage;
