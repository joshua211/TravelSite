import React, { Component } from "react";
import AuthBar from "./authorization/AuthBar";
import { NavLink } from "react-router-dom";
import authService from "./authorization/AuthService";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { isActive: false };
    authService.registerCallback(() => this.setState({}));
  }

  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <NavLink className="navbar-item" to="./">
            <img src="./travel.png" alt="Travelsite"></img>
          </NavLink>
          <a
            role="button"
            className={
              this.state.isActive
                ? "navbar-burger burger is-active"
                : "navbar-burger burger"
            }
            onClick={this.ToggleNavbar}
            aria-label="menu"
            aria-expanded="false"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div
          className={
            this.state.isActive ? "navbar-menu is-active" : "navbar-menu"
          }
        >
          {authService.hasRole("User") ? (
            <div className="navbar-start">
              <NavLink to="/travelBuilder" className="navbar-item">
                New Travel
              </NavLink>

              <NavLink to="/myTravels" className="navbar-item">
                My travels
              </NavLink>
            </div>
          ) : authService.hasRole("Organizer") ? (
            <div className="navbar-start">
              <NavLink to="/addActivity" className="navbar-item">
                Add Activity
              </NavLink>

              <NavLink to="/myActivities" className="navbar-item">
                My Activities
              </NavLink>
            </div>
          ) : (
            <div> </div>
          )}
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">{<AuthBar />}</div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  ToggleNavbar = () => {
    this.setState((prev, props) => ({ isActive: !prev.isActive }));
  };
}

export default Navbar;

//<div>Icons made by <a href="https://www.flaticon.com/authors/chanut" title="Chanut">Chanut</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
