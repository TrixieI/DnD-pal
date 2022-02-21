import Navigation from "./Navigation";
import React from "react";
import axios from "axios";
import Upload from "./Upload";
import { connect } from "react-redux";
import { increase, decrease } from "../actions/index";

class Character extends React.Component {
  constructor() {
    super();
    this.state = {
      classes: [],
      name: "",
      class: "",
      level: null,
      levels: ["N/A", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      alignment: [],
      selectedAlignment: "",
    };
  }

  async componentDidMount() {
    try {
      const grab = await axios.get("https://www.dnd5eapi.co/api/classes");
      this.setState({ classes: grab.data.results });
      const grab2 = await axios.get("https://www.dnd5eapi.co/api/alignments");
      this.setState({ alignment: grab2.data.results });
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
      alignment: this.state.selectedAlignment,
    };
    if (user.name.length === 0) user.name = "John Doe";
    if (user.class.length === 0) user.class = "NPC";
    if (user.level === undefined || null || "N/A") user.level = 1;
    if (user.alignment.length === 0) user.alignment = "Neutral";
    localStorage.setItem("hero", JSON.stringify(user));
    document.location.reload();
  };

  handleDeleteCharacter = async () => {
    const avatar = JSON.parse(localStorage.getItem("avatar"));
    if (avatar) {
      await axios.post(`http://localhost:3001/image/${avatar}`);
      localStorage.removeItem("hero");
      localStorage.removeItem("avatar");
      document.location.reload();
    } else {
      localStorage.removeItem("hero");
      localStorage.removeItem("avatar");
      document.location.reload();
    }
  };

  render() {
    const hero = JSON.parse(localStorage.getItem("hero"));

    return (
      <div className="info">
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
          Alignment:
          <select name="selectedAlignment" onChange={this.handleHero}>
            <option>N/A</option>
            {this.state.alignment.map((item, i) => {
              return <option key={i}>{item.name}</option>;
            })}
          </select>
          <br></br>
          <button className="btn3" type="submit" onClick={this.handleCreate}>
            {hero ? "Edit" : "Create"}
          </button>
          <div>
            {hero ? (
              <div>
                <Upload />
                <h3>Name: {hero.name}</h3>
                <h3>Class: {hero.class}</h3>
                <h3>Level: {hero.level}</h3>
                <h3>Alignment: {hero.alignment}</h3>
                <button
                  onClick={() => this.props.myIncrease(this.props.counter)}
                >
                  +
                </button>
                <h4>Current health points: {this.props.counter}</h4>

                <button
                  onClick={() => this.props.myDecrease(this.props.counter)}
                >
                  -
                </button>
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

const mapStateToProps = (state) => {
  return {
    counter: state.counter,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    myIncrease: (count) => dispatch(increase(count)),
    myDecrease: (count) => dispatch(decrease(count)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Character);
