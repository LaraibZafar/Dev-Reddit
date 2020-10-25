import React from 'react'
import "./home-page.styles.scss"

const Homepage = () => (
        <div className="home-page-container">   
            <div className="backgroud-image">
                <div className="dark-overlay" /> 
                <div className="center-text">
                <h1>Dev-Reddit</h1>
                <i class="fas fa-code" />
                </div>
            </div> 
        </div>
    );

export default Homepage;
