import React, { Component } from "react";
import axios from "axios";

export default class Spellcasting extends Component {
  constructor() {
    super();
    this.state = {
      desc: ``,
      whatis: ``,
      casting: ``,
    };
  }
  async componentDidMount() {
    const data = await axios(`https://www.dnd5eapi.co/api/rules/spellcasting`);
    this.setState({ desc: data.data.desc });
  }

  handleWhatis = async () => {
    const whatis = await axios(
      `https://www.dnd5eapi.co/api/rule-sections/what-is-a-spell`
    );
    this.setState({ whatis: whatis.data.desc });
  };

  handleCasting = async () => {
    const casting = await axios(
      `https://www.dnd5eapi.co/api/rule-sections/casting-a-spell`
    );
    this.setState({ casting: casting.data.desc });
  };

  render() {
    return (
      <div className="info">
        <p>{this.state.desc}</p>
        <button onClick={this.handleWhatis} className="btn">
          What is a spell:
        </button>
        <p>{this.state.whatis}</p>
        <button onClick={this.handleCasting} className="btn">
          Casting a spell:
        </button>
        <p>{this.state.casting}</p>
        <br></br>
      </div>
    );
  }
}
