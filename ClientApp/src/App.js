import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";

import "./App.scss";
import AuthRoute from "components/authorization/AuthRoute";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path="/" component={Home} />
        <AuthRoute role="User" path="/admin" component={Home} />
      </Layout>
    );
  }
}
