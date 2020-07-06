import React, { Component } from "react";
import Button from "react-bulma-components";

export class Home extends Component {
  static displayName = Home.name;
  state = { greeting: "" };

  async componentDidMount() {
    let result = await fetch("/api/Greetings");
    this.setState({ greeting: await result.text() });
  }

  render() {
    return (
      <section className="hero is-bold is-fullheight-with-navbar is-light is-bold">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">{this.state.greeting}</h1>
            <h2 className="subtitle">Join now and book your next adventure!</h2>
            <a href="/register" className="button is-large is-dark">
              Register
            </a>
          </div>
        </div>
      </section>
    );
  }
}
