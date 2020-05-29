import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import authService from "./AuthService";
import { Home } from "../Home.js";

class AuthRoute extends Component {
  constructor(props) {
    super(props);
    this.state = { isAuthorized: false };
  }

  componentDidMount() {
    this.GetAuthorized(this.props.role);
    authService.registerCallback(() => this.GetAuthorized(this.props.role));
  }

  GetAuthorized = (role) => {
    this.setState({
      isAuthorized: authService.isAuthenticated() && authService.hasRole(role),
    });
  };

  render() {
    const component = this.state.isAuthorized ? this.props.component : Home;
    return <Route path={this.props.path} component={component} />;
  }
}

export default AuthRoute;
