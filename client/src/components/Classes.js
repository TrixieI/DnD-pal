import React, { Component } from "react";
import axios from "axios";

export default class Classes extends Component {
  constructor() {
    super();
    this.state = {
      classes: [],
      class: "",
      info: [],
    };
  }
  async componentDidMount() {
    try {
      const grab = await axios.get("https://www.dnd5eapi.co/api/classes");
      this.setState({ classes: grab.data.results });
    } catch (error) {
      console.log(error);
    }
  }

  handleClass = async (e) => {
    const hero = e.target.value;
    try {
      const grab = await axios.get(
        `https://www.dnd5eapi.co/api/classes/${hero}`
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
        <h1>Classes</h1>
        <div className="information"></div>
        <div>
          <br></br>
          {this.state.classes.map((item, i) => {
            return (
              <button
                className="btn4"
                value={item.index}
                style={{ fontSize: "20px", cursor: "pointer" }}
                onClick={this.handleClass}
                key={i}
              >
                {item.name}
              </button>
            );
          })}
          <div className="info">
            <h2>{this.state.info.name}</h2>
            <p>Hit die: {this.state.info.hit_die}</p>
            <p>Starting equipment:</p>
            {this.state.info.starting_equipment?.length > 0
              ? this.state.info.starting_equipment.map((item, i) => {
                  return (
                    <button className="btn2" key={i}>
                      {item.equipment.name}
                    </button>
                  );
                })
              : null}
            <p>proficiencies: </p>
            {this.state.info.proficiencies?.length > 0
              ? this.state.info.proficiencies.map((item, i) => {
                  return (
                    <button className="btn2" key={i}>
                      {item.name}
                    </button>
                  );
                })
              : null}
            <p>Subclass:</p>
            {this.state.info.subclasses?.length > 0
              ? this.state.info.subclasses.map((item, i) => {
                  return (
                    <button className="btn3" key={i}>
                      {item.name}
                    </button>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    );
  }
}
