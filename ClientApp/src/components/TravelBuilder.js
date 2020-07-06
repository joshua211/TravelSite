import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import ActivityPicker from "./ActivityPicker";
import Select from "react-select";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export class TravelBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activites: [],
      availableActivities: [],
      locations: [],
      showCulture: true,
      showAdventure: true,
      showSport: true,
      selectedOptions: null,
      selectedLocation: null,
      startDate: new Date(),
      endDate: new Date(),
      error: null,
      status: null,
      redirect: -1,
    };
  }

  async componentDidMount() {
    var activites = await fetch("api/Activity");
    var locations = await fetch("api/Travel/Locations");
    this.setState({
      activites: await activites.json(),
      locations: await locations.json(),
    });
  }

  render() {
    return (
      <div className="section">
        <label className="label">Pick a location</label>
        <Select
          onChange={this.handleLocationChange}
          options={this.state.locations.map((l) => {
            return { value: l, label: l };
          })}
        />
        <label className="label">Choose your activities</label>
        <div className="activityOptions">
          <label className="checkbox">
            <input
              onChange={(e) =>
                this.setState({ showCulture: e.target.checked }, () =>
                  this.handleFilter()
                )
              }
              checked={this.state.showCulture}
              type="checkbox"
            />
            Culture
          </label>
          <label className="checkbox">
            <input
              onChange={(e) => {
                this.setState(
                  {
                    showAdventure: e.target.checked,
                  },
                  () => this.handleFilter()
                );
              }}
              checked={this.state.showAdventure}
              type="checkbox"
            />
            Adventure
          </label>
          <label className="checkbox">
            <input
              onChange={(e) =>
                this.setState({ showSport: e.target.checked }, () =>
                  this.handleFilter()
                )
              }
              checked={this.state.showSport}
              type="checkbox"
            />
            Sport
          </label>
        </div>
        <ActivityPicker
          onChange={this.handleActivityChange}
          activites={this.state.availableActivities}
        />
        <label className="label">When are you going?</label>
        <DatePicker
          onChange={this.handleStartChange}
          selected={this.state.startDate}
        />
        <label className="label">At wich day are you coming back?</label>
        <DatePicker
          onChange={this.handleEndChange}
          selected={this.state.endDate}
        />
        <div style={{ marginTop: 50 + "px" }} className="control">
          <button
            onClick={this.bookTravel}
            className={
              this.state.status == "pending"
                ? "button is-primary is-loading"
                : "button is-primary"
            }
          >
            Book now
          </button>
          <div className={this.state.status == "success" ? "" : "is-hidden"}>
            Succesfully booked!
          </div>
        </div>

        <div className={this.state.error ? "control" : "control is-hidden"}>
          {this.state.error}
        </div>
        {this.state.redirect != -1 && (
          <Redirect to={"/travel/" + this.state.redirect} />
        )}
      </div>
    );
  }

  bookTravel = () => {
    if (
      this.state.selectedLocation == null ||
      this.state.selectedOptions == null
    ) {
      this.setState({
        error: "Please pick a location and at least one activity",
      });
      return;
    } else if (
      this.state.endDate - this.state.startDate < 1 ||
      Date.now() - this.state.startDate < 1
    ) {
      this.setState({ error: "Please choose a different time!" });
      return;
    }

    this.setState({ error: null, status: "pending" });
    var travel = {
      Location: this.state.selectedLocation,
      StartDate: this.state.startDate.toISOString(),
      EndDate: this.state.endDate.toISOString(),
      Activities: this.state.selectedOptions,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("currentUser")).token,
      },
      body: JSON.stringify(travel),
    };

    fetch("api/Travel", requestOptions)
      .then((response) => {
        if (!response.ok) throw new Error("Something went wrong!");
        //this.setState({ status: "success" });
        response
          .json()
          .then((t) => this.setState({ status: "succes", redirect: t.id }));
      })
      .catch((error) => this.setState({ error: error.message, status: null }));
  };

  handleFilter = () => {
    let available = this.state.activites;
    available = this.state.selectedLocation
      ? available.filter((a) => a.location == this.state.selectedLocation)
      : available;
    available = this.state.showAdventure
      ? available
      : available.filter((a) => a.category != "Adventure");
    available = this.state.showCulture
      ? available
      : available.filter((a) => a.category != "Culture");
    available = this.state.showSport
      ? available
      : available.filter((a) => a.category != "Sport");

    console.log(available);

    this.setState({ availableActivities: available });
  };

  handleStartChange = (date) => {
    this.setState({ startDate: date });
  };

  handleEndChange = (date) => {
    this.setState({ endDate: date });
  };

  handleLocationChange = (location) => {
    this.setState(
      {
        selectedLocation: location.value,
      },
      () => this.handleFilter()
    );
  };

  handleActivityChange = (selectedOptions) => {
    var activities = selectedOptions ? selectedOptions.map((o) => o.value) : [];
    console.log(activities);
    this.setState({ selectedOptions: activities });
  };
}

export default TravelBuilder;
