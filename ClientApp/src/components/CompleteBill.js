import React, { Component } from "react";

class CompleteBill extends Component {
  constructor(props) {
    super(props);
    this.state = { travel: null };
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

    fetch("api/Travel/" + this.props.match.params.id, requestOptions)
      .then((response) => {
        if (!response.ok) throw new Error("Something went wrong!");
        response.json().then((t) => this.setState({ travel: t }));
      })
      .catch((error) => console.log(error));
  }

  render() {
    var travel = this.state.travel;
    console.log(travel);
    return (
      <div className="section">
        {travel === null ? (
          <div> Loading... </div>
        ) : (
          <div>
            <div className="field">
              <h1 className="title">{"Travel to " + travel.location}</h1>
              <div className="control"></div>
            </div>

            <div className="field">
              <label className="label">Contact mail</label>
              <div className="control">
                <input type="text" disabled value={travel.userEmail} />
              </div>
            </div>

            <div className="field">
              <label className="label">Start Date</label>
              <div className="control">
                <input type="text" disabled value={travel.startDate} />
              </div>
            </div>
            <div className="field">
              <label className="label">End Date</label>
              <div className="control">
                <input type="text" disabled value={travel.endDate} />
              </div>
            </div>
            <div className="field">
              <label className="label">Total price</label>
              <div className="control">
                <input type="text" disabled value={travel.price + "€"} />
              </div>
            </div>

            <h4 className="title">Activities</h4>
            {travel.activities.map((a) => {
              return (
                <div className="activityContainer" key={a.id}>
                  <h2 className="subtitle">{a.name}</h2>
                  <div className="field">
                    <label className="label">Price</label>
                    <div className="control">
                      <input type="text" disabled value={a.price + "€"} />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Category</label>
                    <div className="control">
                      <input type="text" disabled value={a.category} />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Required equipment</label>
                    <div className="control">
                      <input
                        type="text"
                        disabled
                        value={
                          a.requiredEquipment
                            ? a.requiredEquipment.toString()
                            : "none"
                        }
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Summary</label>
                    <div className="control">
                      <input type="text" disabled value={a.summary} />
                    </div>
                  </div>
                  <br />
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default CompleteBill;
