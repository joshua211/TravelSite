import React, { Component } from "react";
import AuthMenu from "./AuthMenu.jsx";
import authService from "./AuthService.js";

class AuthBar extends Component {
  constructor(props) {
    super(props);
    this.state = { showLogin: false };
  }
  render() {
    return (
      <div>
        {authService.isAuthenticated() ? (
          <div>
            <a onClick={this.onLogout} className="button is-light">
              Log out
            </a>
          </div>
        ) : (
          <div>
            <a href="/register" className="button is-info">
              <strong>Sign up</strong>
            </a>
            <a onClick={this.ToggleShowLogin} className="button is-light">
              Log in
            </a>{" "}
          </div>
        )}
        {this.state.showLogin && <AuthMenu close={this.ToggleShowLogin} />}
      </div>
    );
  }

  onLogout = () => {
    authService.logout();
    this.setState({ showLogin: false });
  };

  ToggleShowLogin = () => {
    this.setState((prev, props) => ({ showLogin: !prev.showLogin }));
  };
}

export default AuthBar;
