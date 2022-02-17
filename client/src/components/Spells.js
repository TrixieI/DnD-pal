import React, { Component } from "react";
import axios from "axios";

export default class Spells extends Component {
  constructor() {
    super();
    this.state = {
      spellsList: [],
      spell: ``,
      selectedSpell: "",
      text: "",
    };
  }
  async componentDidMount() {
    const data = await axios(`https://www.dnd5eapi.co/api/spells/`);
    this.setState({ spellsList: data.data.results });
  }

  handleChange = (e) => {
    this.setState({ text: e.target.value });
  };

  handleWhatis = async () => {
    const whatis = await axios(
      `https://www.dnd5eapi.co/api/rule-sections/what-is-a-spell`
    );
    this.setState({ whatis: whatis.data.desc });
  };

  render() {
    return (
      <div className="info">
        <div>
          <input
            onChange={this.handleChange}
            type="text"
            placeholder="Search spells"
          />
        </div>
        {this.state.spellsList
          .filter((val) => {
            if (this.state.text === "") {
              return val;
            } else if (
              val.name.toLowerCase().includes(this.state.text.toLowerCase())
            ) {
              return val;
            }
          })
          .map((item, i) => {
            return (
              <button
                className="btn3"
                value={item.index}
                style={{ fontSize: "20px", cursor: "pointer", margin: "10px" }}
                onClick={this.handleSpell}
                key={i}
              >
                {item.name}
              </button>
            );
          })}

        {/* {this.state.spellsList.map((item, i) => {
          return (
            <button
              className="btn3"
              value={item.index}
              style={{ fontSize: "20px", cursor: "pointer", margin: "10px" }}
              onClick={this.handleSpell}
              key={i}
            >
              {item.name}
            </button>
          );
        })} */}
      </div>
    );
  }
}
