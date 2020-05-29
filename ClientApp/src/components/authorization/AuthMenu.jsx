import React, { Component } from "react";
import authService from "./AuthService";
import "./AuthMenu.scss";

class AuthMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", error: "" };
  }
  render() {
    return (
      <div className="authMenu">
        <div className="field">
          <label htmlFor="emailInput" className="label"></label>
          <div className="control">
            <input
              onChange={this.handleEmail}
              value={this.state.email}
              className="input"
              type="text"
              name="emailInput"
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="pwInput" className="label"></label>
          <div className="control">
            <input
              onChange={this.handlePassword}
              value={this.state.password}
              className="input"
              type="password"
              name="pwInput"
            />
          </div>
        </div>
        {this.state.error && <div>{this.state.error}</div>}
        <div className="field is-grouped">
          <div className="control">
            <button onClick={this.login} className="button is-link">
              Login
            </button>
          </div>
          <div className="control">
            <button
              onClick={this.props.close}
              className="button is-link is-light"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  handleEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  handlePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  login = () => {
    authService.login(this.state.email, this.state.password).then((r) => {
      if (r.successful) {
        this.props.close();
      } else this.setState({ error: r.error });
    });
  };
}

export default AuthMenu;
