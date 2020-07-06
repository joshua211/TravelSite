import React, { Component } from "react";

class ActivityOrganizer extends Component {
  constructor(props) {
    super(props);
    this.state = { activities: [] };
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

    fetch("api/Activity/Organizer", requestOptions)
      .then((response) => {
        if (!response.ok) throw new Error("Something went wrong!");
        response.json().then((r) => this.setState({ activities: r }));
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <div className="section">
        {this.state.activities.length > 0 ? (
          <table className="table is-striped">
            <thead>
              <tr>
                <td>Location</td>
                <td>Name</td>
                <td>Price</td>
                <td>Category</td>
                <td>Required Equipment</td>
                <td>Summary</td>
                <td>Cancel</td>
              </tr>
            </thead>
            <tbody>
              {this.state.activities.map((t) => {
                return (
                  <tr key={t.id}>
                    <td>{t.location}</td>
                    <td>{t.name}</td>
                    <td>{t.price}</td>
                    <td>{t.category}</td>
                    <td>{t.requiredEquipment}</td>
                    <td>{t.summary}</td>
                    <td>
                      <a
                        onClick={() => this.cancelActivity(t.id)}
                        className="delete"
                      ></a>{" "}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <h2 className="title">No activities yet</h2>
        )}
      </div>
    );
  }

  cancelActivity = (id) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("currentUser")).token,
      },
    };

    fetch("api/Activity/" + id, requestOptions)
      .then((response) => {
        if (!response.ok) throw new Error("Something went wrong!");
        this.setState({
          travels: this.state.travels.filter((t) => t.id != id),
        });
      })
      .catch((error) => console.log(error));
  };
}

export default ActivityOrganizer;
