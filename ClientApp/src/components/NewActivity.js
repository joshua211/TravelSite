import React, { Component } from "react";
import ActivityEditor from "./ActivityEditor";
import { Redirect } from "react-router-dom";

class NewActivity extends Component {
  constructor(props) {
    super(props);
    this.state = { redirect: false };
  }
  render() {
    return (
      <div>
        {this.state.redirect && <Redirect to="/myActivities" />}
        <ActivityEditor onSave={this.AddActivity} />;
      </div>
    );
  }

  AddActivity = (activity) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("currentUser")).token,
      },
      body: JSON.stringify(activity),
    };

    fetch("api/Activity", requestOptions)
      .then((response) => {
        if (!response.ok) throw new Error("Something went wrong!");
        console.log("Succes");
        this.setState({ redirect: true });
      })
      .catch((error) => console.log(error));
  };
}

export default NewActivity;
