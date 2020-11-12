import React, { Fragment, useEffect } from "react";
import "./App.css";

import Particles from "react-particles-js";
import particleParams from "./assets/particlesjs-config.json";

import { Route, Switch, Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { loadUser } from "./redux/auth-reducer/auth.actions";
import setAuthToken from "./utils/setAuthToken";

import Header from "./components/header-component/header.component";
import Homepage from "./page-components/home-page-component/home-page.component";
import LoginPage from "./page-components/login-page-component/login-page.component";
import SignupPage from "./page-components/signup-page-component/signup-page.component";
import DashboardPage from "./page-components/dashboard-page-component/dasboard-page.component.jsx";
import CreateProfilePage from "./page-components/create-profile-page-component/create-profile-page.component";
import PrivateRoute from "./components/private-route-component/private-route.component";
import Alert from "./components/alert-component/alert.component";

const App = ({ loadUser }) => {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token); //set default token
    }
    loadUser();
  }, []);
  return (
    <Fragment>
      <Header />
      <Particles className="params" params={particleParams} />
      <Route exact path="/" component={Homepage} />
      <section className="container">
        <Alert />
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={SignupPage} />
          <PrivateRoute exact path="/dashboard" component={DashboardPage} />
          <PrivateRoute
            exact
            path="/create-profile"
            component={CreateProfilePage}
          />
        </Switch>
      </section>
    </Fragment>
  );
};

const mapDispatchToProps = (dispatch) => ({
  loadUser: () => dispatch(loadUser()),
});

export default connect(null, mapDispatchToProps)(App);
