import React, { Component } from "react";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { isActive: false };
  }

  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="./">
            <img src="./travel.png" alt="Travelsite"></img>
          </a>
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
          <div className="navbar-start">
            <a className="navbar-item">New Travel</a>

            <a className="navbar-item">Manage smth?</a>

            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">Other stuff</a>

              <div className="navbar-dropdown">
                <a className="navbar-item">About</a>
                <a className="navbar-item">dunno</a>
                <a className="navbar-item">Contact</a>
              </div>
            </div>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <a className="button is-info">
                  <strong>Sign up</strong>
                </a>
                <a className="button is-light">Log in</a>
              </div>
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
