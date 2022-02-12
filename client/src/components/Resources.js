import React from "react";
import axios from "axios";
import Navigation from "./Navigation";

class Resources extends React.Component {
  constructor() {
    super();
    this.state = {
      classes: [],
      class: "",
      info: [],
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
    const hero = e.target.value;
    this.setState({ class: hero });
    try {
      const grab = await axios.get(
        `https://www.dnd5eapi.co/api/classes/${this.state.class}`
      );
      this.setState({ info: grab.data });
      console.log(this.state.info);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div>
        <Navigation />
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
          <div>
            {}
            <h2>{this.state.info.name}</h2>
            <p>Hit die: {this.state.info.hit_die}</p>
            <p>Proficiencies:</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Resources;
