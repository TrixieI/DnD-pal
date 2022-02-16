import axios from "axios";
import React, { Component } from "react";

export default class Environment extends Component {
  constructor() {
    super();
    this.state = {
      envio: "",
    };
  }

  async componentDidMount() {
    const data = await axios(
      `https://www.dnd5eapi.co/api/rule-sections/the-environment`
    );
    this.setState({ envio: data.data.desc });
  }

  render() {
    return (
      <div className="info">
        <h1>The Environment</h1>
        <p>{this.state.envio}</p>
      </div>
    );
  }
}
