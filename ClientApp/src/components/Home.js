import React, { Component } from "react";
import Button from "react-bulma-components";

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <p>
          This is a work in progress web <code>application!</code>
        </p>
      </div>
    );
  }
}
