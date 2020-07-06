import React, { Component } from "react";
import Select from "react-select";

class ActivityPicker extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedOptions: [], totalPrice: 0 };
  }

  render() {
    return (
      <div>
        <Select
          isMulti
          onChange={(selectedOptions) => {
            console.log(selectedOptions);
            this.props.onChange(selectedOptions);
            let totalPrice = 0;
            if (selectedOptions != null)
              selectedOptions.forEach((s) => (totalPrice += s.value.price));
            console.log("Totalprice: " + totalPrice);
            this.setState({
              totalPrice: totalPrice,
            });
          }}
          options={this.props.activites.map((a) => {
            return { value: a, label: a.name + " - " + a.price + "€" };
          })}
        />
        <span>{this.state.totalPrice + "€"}</span>
      </div>
    );
  }
}

export default ActivityPicker;
