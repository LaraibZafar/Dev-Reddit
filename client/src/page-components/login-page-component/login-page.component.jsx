import React from 'react'
import "./login-page.styles.scss";

import Login from '../../components/login-component/login.component';




const LoginPage=()=> {
    return (
       <div className="login-page-container">
        <Login className="login" />
        </div>
    )
}
export default LoginPage;
