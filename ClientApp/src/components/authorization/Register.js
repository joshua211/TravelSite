import React, { Component } from "react";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", type: "User" };
  }
  render() {
    return (
      <div className="section">
        <div className="registerForm">
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                value={this.state.email}
                onChange={(e) => this.setState({ email: e.target.value })}
                type="text"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                value={this.state.password}
                onChange={(e) => this.setState({ password: e.target.value })}
                type="Password"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Register as</label>
            <div className="select">
              <select
                value={this.state.type}
                onChange={(e) => this.setState({ type: e.target.value })}
              >
                <option value="User">Private Customer</option>
                <option value="Organizer">Business Customer</option>
              </select>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button onClick={this.register} className="button">
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  register = () => {
    let registerModel = {
      Email: this.state.email,
      Password: this.state.password,
      Role: this.state.type,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerModel),
    };

    fetch("api/Authentication/Register", requestOptions)
      .then((res) => {
        if (!res.ok) console.log("Something went wrong");
      })
      .catch((e) => console.log(e));
    console.log(registerModel);
  };
}

export default Register;
