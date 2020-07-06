import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { TravelBuilder } from "./components/TravelBuilder";

import "./App.scss";
import AuthRoute from "components/authorization/AuthRoute";
import TravelOrganizer from "components/TravelOrganizer";
import ActivityEditor from "components/ActivityEditor";
import NewActivity from "components/NewActivity";
import ActivityOrganizer from "components/ActivityOrganizer";
import CompleteBill from "components/CompleteBill";
import Register from "components/authorization/Register";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        {/* <Route path="/travelBuilder" component={TravelBuilder} /> */}
        <AuthRoute
          role="User"
          path="/travelBuilder"
          component={TravelBuilder}
        />

        <AuthRoute role="User" path="/myTravels" component={TravelOrganizer} />

        <AuthRoute role="User" path="/travel/:id" component={CompleteBill} />

        <AuthRoute
          role="Organizer"
          path="/addActivity"
          component={NewActivity}
        />

        <AuthRoute
          role="Organizer"
          path="/myActivities"
          component={ActivityOrganizer}
        />
      </Layout>
    );
  }
}
