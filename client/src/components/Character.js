import Navigation from "./Navigation";
import React from "react";
import axios from "axios";

class Character extends React.Component {
  constructor() {
    super();
    this.state = {
      classes: [],
      name: "",
      class: "",
      level: null,
      levels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
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

  handleHero = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  handleCreate = () => {
    const user = {
      name: this.state.name,
      class: this.state.class,
      level: this.state.level,
    };
    localStorage.setItem("hero", JSON.stringify(user));
    document.location.reload();
  };

  handleDeleteCharacter = () => {
    localStorage.removeItem("hero");
    document.location.reload();
  };

  render() {
    const hero = JSON.parse(localStorage.getItem("hero"));

    return (
      <div>
        <Navigation />
        <div>
          <h1>Character Creator</h1>
          Character name:
          <input name="name" onChange={this.handleHero} type="text" />
          <br></br>
          Character level:
          <select name="level" onChange={this.handleHero} type="text">
            {this.state.levels.map((level, i) => {
              return <option key={i}>{level}</option>;
            })}
          </select>
          <br></br>
          Character class:
          <select name="class" onChange={this.handleHero}>
            <option>N/A</option>
            {this.state.classes.map((item, i) => {
              return <option key={i}>{item.name}</option>;
            })}
          </select>
          <br></br>
          <button className="btn3" type="submit" onClick={this.handleCreate}>
            Create
          </button>
          <div>
            {hero ? (
              <div>
                <h3>Name: {hero.name}</h3>
                <h3>Class: {hero.class}</h3>
                <h3>Level: {hero.level}</h3>
              </div>
            ) : (
              <div></div>
            )}
            <button
              className="btn2"
              type="submit"
              onClick={this.handleDeleteCharacter}
            >
              Delete character
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Character;
