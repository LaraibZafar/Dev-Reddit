import React from 'react'
import "./login-page.styles.scss";
import Particles from "react-particles-js";
import particleParams from '../../assets/particlesjs-config.json';

import Login from '../../components/login-component/login.component';




const LoginPage=()=> {
    return (
       <div className="login-page-container">
       <Particles className="params" params={particleParams} />
        <Login className="login" />
        </div>
    )
}
export default LoginPage;
