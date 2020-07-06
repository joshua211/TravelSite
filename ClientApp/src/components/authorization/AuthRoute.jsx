import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import authService from "./AuthService";
import { Home } from "../Home.js";

class AuthRoute extends Component {
  constructor(props) {
    super(props);
    this.state = { isAuthorized: false, ready: false };
  }

  componentDidMount() {
    this.GetAuthorized(this.props.role);
    authService.registerCallback(() => this.GetAuthorized(this.props.role));
  }

  GetAuthorized = (role) => {
    this.setState({
      ready: true,
      isAuthorized: authService.isAuthenticated() && authService.hasRole(role),
    });
  };

  render() {
    const { component: Component, ...rest } = this.props;
    const authorized = this.state.isAuthorized;
    if (this.state.ready)
      return (
        <Route
          {...rest}
          render={(props) => {
            if (authorized) {
              return <Component {...props} />;
            } else {
              return <Redirect to={"/"} />;
            }
          }}
        />
      );
    else return <div></div>;
  }
}

export default AuthRoute;
