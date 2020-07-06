import React, { Component } from "react";

class TravelOrganizer extends Component {
  constructor(props) {
    super(props);
    this.state = { travels: [] };
  }

  componentDidMount() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("currentUser")).token,
      },
    };

    fetch("api/Travel/User", requestOptions)
      .then((response) => {
        if (!response.ok) throw new Error("Something went wrong!");
        response.json().then((r) => this.setState({ travels: r }));
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <div className="section">
        {this.state.travels.length > 0 ? (
          <table className="table is-striped">
            <thead>
              <tr>
                <td>Location</td>
                <td>Start</td>
                <td>End</td>
                <td>Cancel</td>
              </tr>
            </thead>
            <tbody>
              {this.state.travels.map((t) => {
                return (
                  <tr key={t.id}>
                    <td>{t.location}</td>
                    <td>{t.startDate}</td>
                    <td>{t.endDate}</td>
                    <td>
                      <a
                        onClick={() => this.cancelTravel(t.id)}
                        className="delete"
                      ></a>{" "}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <h2 className="title">No travels yet</h2>
        )}
      </div>
    );
  }

  cancelTravel = (id) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("currentUser")).token,
      },
    };

    fetch("api/Travel/" + id, requestOptions)
      .then((response) => {
        if (!response.ok) throw new Error("Something went wrong!");
        this.setState({
          travels: this.state.travels.filter((t) => t.id != id),
        });
      })
      .catch((error) => console.log(error));
  };
}

export default TravelOrganizer;
