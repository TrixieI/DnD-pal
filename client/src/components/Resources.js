import React from "react";
import Navigation from "./Navigation";
import Spellcasting from "./Spellcasting";
import Classes from "./Classes";
import Environment from "./Environment";
import Abilitychecks from "./Abilitychecks";
import Abilityscore from "./Abilityscores";
import Spells from "./Spells";
import Traits from "./Traits";
import Equipment from "./Equipment";
import Languages from "./Languages";

class Resources extends React.Component {
  constructor() {
    super();
    this.state = {
      classes: false,
      spellcasting: false,
      envio: false,
      ability: false,
      abilityscores: false,
      spells: false,
      traits: false,
      equipment: false,
      languages: false,
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
  handleSpells = () => {
    this.setState((prevState) => ({
      spells: !prevState.spells,
    }));
  };
  handleTraits = () => {
    this.setState((prevState) => ({
      traits: !prevState.traits,
    }));
  };
  handleEquipment = () => {
    this.setState((prevState) => ({
      equipment: !prevState.equipment,
    }));
  };
  handleLanguages = () => {
    this.setState((prevState) => ({
      languages: !prevState.languages,
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
          <button className="btn" onClick={this.handleSpells}>
            Spells
          </button>
          <button className="btn" onClick={this.handleTraits}>
            Traits
          </button>
          <button className="btn" onClick={this.handleEquipment}>
            Equipment
          </button>
          <button className="btn" onClick={this.handleLanguages}>
            Languages
          </button>
          <br></br>

          {this.state.spellcasting === true ? <Spellcasting /> : null}
          {this.state.classes === true ? <Classes /> : null}
          {this.state.envio === true ? <Environment /> : null}
          {this.state.ability === true ? <Abilitychecks /> : null}
          {this.state.abilityscores === true ? <Abilityscore /> : null}
          {this.state.spells === true ? <Spells /> : null}
          {this.state.traits === true ? <Traits /> : null}
          {this.state.equipment === true ? <Equipment /> : null}
          {this.state.languages === true ? <Languages /> : null}
        </div>
      </div>
    );
  }
}

export default Resources;
