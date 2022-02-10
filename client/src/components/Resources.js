import React from "react";
import axios from "axios";

class Resources extends React.Component {
  constructor() {
    super();
    this.state = {
      classes: [],
      class: "",
    };
  }

  handleClasses = async () => {
    try {
      const grab = await axios.get("https://www.dnd5eapi.co/api/classes");
      this.setState({ classes: grab.data.results });
    } catch (error) {
      console.log(error);
    }
  };

  handleClass = async (e) => {
    this.setState({ class: e.target.id });
    console.log(this.state.class);

    try {
      const grab = await axios.get(
        `https://www.dnd5eapi.co/api/classes/${this.state.class}`
      );
      console.log(grab);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    console.log(this.state.classes);
    return (
      <div>
        <h1>Resources page</h1>
        <div className="information"></div>
        <div>
          <li>
            <button onClick={this.handleClasses}>Classes</button>
          </li>
          {this.state.classes.map((item, i) => {
            return (
              <button
                value={item.index}
                style={{ fontSize: "20px", cursor: "pointer" }}
                onClick={this.handleClass}
                key={i}
              >
                {item.name}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Resources;
