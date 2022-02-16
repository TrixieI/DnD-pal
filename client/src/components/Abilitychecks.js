import axios from "axios";
import React, { Component } from "react";

export default class Abilitychecks extends Component {
  constructor() {
    super();
    this.state = {
      ability: "",
    };
  }

  async componentDidMount() {
    const data = await axios(
      `https://www.dnd5eapi.co/api/rule-sections/ability-checks`
    );
    this.setState({ ability: data.data.desc });
  }

  render() {
    return (
      <div className="info">
        <h1>Ability Checks:</h1>
        <p>{this.state.ability}</p>
      </div>
    );
  }
}
