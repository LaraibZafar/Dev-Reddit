import React from 'react'
import "./home-page.styles.scss"

import {Link} from 'react-router-dom';

const Homepage = () => (
        <div className="home-page-container">   
            <div className="backgroud-image">
                <div className="dark-overlay" /> 
                <div className="center-text">
                <h1>Dev-Reddit</h1>
                <i class="fas fa-code" />
                <br />
                <div className="button-container">
                <Link to="/signup" className="btn btn-primary">Register</Link>
                <Link to="/login" className="btn btn-secondary">Login</Link>
                </div>
                </div>
            </div> 
        </div>
    );

export default Homepage;
