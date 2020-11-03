import React, { Fragment } from "react";
import "./App.css";

import { Route, Switch } from "react-router-dom";

import Header from "./components/header-component/header.component";
import Homepage from "./page-components/home-page-component/home-page.component";
import LoginPage from "./page-components/login-page-component/login-page.component";
import SignupPage from "./page-components/signup-page-component/signup-page.component";


const App = () => (
  <Fragment>
    <Header />
    <Route exact path="/" component={Homepage} />
    <section className="container">
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={SignupPage} />
      </Switch>
    </section>
  </Fragment>
);
export default App;
