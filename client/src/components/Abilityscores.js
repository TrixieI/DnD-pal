import axios from "axios";
import React, { Component } from "react";

export default class Abilityscore extends Component {
  constructor() {
    super();
    this.state = {
      abilityscores: "",
    };
  }

  async componentDidMount() {
    const data = await axios(
      `https://www.dnd5eapi.co/api/rule-sections/ability-scores-and-modifiers`
    );
    this.setState({ abilityscores: data.data.desc });
  }

  render() {
    return (
      <div className="info">
        <h1>Ability Scores:</h1>
        <p>{this.state.abilityscores}</p>
      </div>
    );
  }
}
