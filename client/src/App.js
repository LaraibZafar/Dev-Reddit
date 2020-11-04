import React, { Fragment, useEffect } from "react";
import "./App.css";

import { Route, Switch } from "react-router-dom";

import {connect} from 'react-redux';
import { loadUser } from "./redux/auth-reducer/auth.actions";
import setAuthToken from './utils/setAuthToken';


import Header from "./components/header-component/header.component";
import Homepage from "./page-components/home-page-component/home-page.component";
import LoginPage from "./page-components/login-page-component/login-page.component";
import SignupPage from "./page-components/signup-page-component/signup-page.component";
import Alert from "./components/alert-component/alert.component";



const App = ({loadUser}) => {
  useEffect(()=>{
    if (localStorage.token) {
      setAuthToken(localStorage.token); //set default token
    }
    loadUser();
  })
  return (
    <Fragment>
      <Header />
      <Route exact path="/" component={Homepage} />
      <section className="container">
        <Alert />
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={SignupPage} />
        </Switch>
      </section>
    </Fragment>
  );
};

const mapDispatchToProps= (dispatch) =>({
 loadUser: () => dispatch(loadUser())
});
export default connect(null,mapDispatchToProps)(App);
