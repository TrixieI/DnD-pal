import React from "react";
import Navigation from "./Navigation";
import Spellcasting from "./Spellcasting";
import Classes from "./Classes";

class Resources extends React.Component {
  constructor() {
    super();
    this.state = {
      classes: false,
      spellcasting: false,
    };
  }

  handleSpellcasting = () => {
    this.setState((prevState) => ({
      spellcasting: !prevState.spellcasting,
    }));
  };

  handleClasses = () => {
    this.setState((prevState) => ({
      classes: !prevState.classes,
    }));
  };

  render() {
    return (
      <div>
        <Navigation />
        <h1>Resources page</h1>
        <div className="information"></div>
        <div>
          <button className="btn" onClick={this.handleClasses}>
            Classes
          </button>
          <button className="btn" onClick={this.handleSpellcasting}>
            Spellcasting
          </button>
          <br></br>

          {this.state.spellcasting === true ? <Spellcasting /> : null}
          {this.state.classes === true ? <Classes /> : null}
        </div>
      </div>
    );
  }
}

export default Resources;
