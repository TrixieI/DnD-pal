import React from "react";
import Navigation from "./Navigation";
import Spellcasting from "./Spellcasting";
import Classes from "./Classes";
import Environment from "./Environment";
import Abilitychecks from "./Abilitychecks";
import Abilityscore from "./Abilityscores";

class Resources extends React.Component {
  constructor() {
    super();
    this.state = {
      classes: false,
      spellcasting: false,
      envio: false,
      ability: false,
      abilityscores: false,
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

  handleEnvironment = () => {
    this.setState((prevState) => ({
      envio: !prevState.envio,
    }));
  };
  handleAbility = () => {
    this.setState((prevState) => ({
      ability: !prevState.ability,
    }));
  };
  handleAbilityscores = () => {
    this.setState((prevState) => ({
      abilityscores: !prevState.abilityscores,
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
          <button className="btn" onClick={this.handleEnvironment}>
            Environment
          </button>
          <button className="btn" onClick={this.handleAbility}>
            Ability Checks
          </button>
          <button className="btn" onClick={this.handleAbilityscores}>
            Ability Scores
          </button>
          <br></br>

          {this.state.spellcasting === true ? <Spellcasting /> : null}
          {this.state.classes === true ? <Classes /> : null}
          {this.state.envio === true ? <Environment /> : null}
          {this.state.ability === true ? <Abilitychecks /> : null}
          {this.state.abilityscores === true ? <Abilityscore /> : null}
        </div>
      </div>
    );
  }
}

export default Resources;
