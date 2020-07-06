import React, { Component } from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

class ActivityEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { locations: [], categories: [] };
    this.activity = {
      name: "",
      location: "",
      price: 0,
      category: "",
      requiredEquipment: [],
      summary: "",
    };
  }

  async componentDidMount() {
    var locations = await fetch("api/Travel/Locations");
    var categories = await fetch("api/Activity/Category");
    this.setState({
      locations: await locations.json(),
      categories: await categories.json(),
    });
  }

  render() {
    return (
      <div className="section">
        <div className="activityEditor">
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                onChange={(e) => (this.activity.name = e.target.value)}
                className="input is-primary"
                type="text"
              ></input>
            </div>
          </div>
          <div className="field">
            <label className="label">Price</label>
            <div className="control">
              <input
                onChange={(e) => (this.activity.price = e.target.value)}
                className="input is-primary"
                type="number"
              ></input>
            </div>
          </div>
          <div className="field">
            <label className="label">Location</label>
            <div className="control">
              <Select
                onChange={(location) => {
                  this.activity.location = location.value;
                }}
                options={this.state.locations.map((l) => {
                  return { value: l, label: l };
                })}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Category</label>
            <div className="control">
              <Select
                onChange={(category) => {
                  this.activity.category = category.value;
                }}
                options={this.state.categories.map((l) => {
                  return { value: l, label: l };
                })}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Required Equipment</label>
            <div className="control">
              <CreatableSelect
                isMulti
                onChange={(v, m) => {
                  var str = [];
                  if (v)
                    v.forEach((element) => {
                      str.push(element.value);
                    });
                  this.activity.requiredEquipment = str;
                }}
                options={[]}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Summary</label>
            <div className="control">
              <input
                onChange={(e) => (this.activity.summary = e.target.value)}
                className="input is-primary"
                type="text"
              ></input>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button
                onClick={() => this.props.onSave(this.activity)}
                className="button is-primary"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ActivityEditor;
