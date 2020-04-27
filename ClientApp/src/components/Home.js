import React, { Component } from "react";
import Button from "react-bulma-components";

export class Home extends Component {
  static displayName = Home.name;
  state = { greeting: "" };

  async componentWillMount() {
    let result = await fetch("/api/Greetings");
    this.setState({ greeting: await result.text() });
  }

  render() {
    return (
      <div>
        <h1>{this.state.greeting}, world!</h1>
        <p>
          This is a work in progress web <code>application!</code>
        </p>
      </div>
    );
  }
}
