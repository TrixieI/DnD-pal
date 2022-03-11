import React from "react";
import axios from "axios";
import { Alert } from "react-bootstrap";
import "../App.css";

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      player: "",
      exists: null,
      created: null,
      field: null,
    };
  }

  handleUser = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  handleRegister = async () => {
    const { player, username, password } = this.state;
    if (!player || !username || !password) {
      this.setState({ field: true });
      setTimeout(() => {
        this.setState({ field: null });
      }, 5000);
    } else {
      const data = await axios.post("https://dndpal.herokuapp.com/register", {
        username: this.state.username,
        password: this.state.password,
        player: this.state.player,
      });

      if (data.data.exists === true) {
        this.setState({ exists: true });
        setTimeout(() => {
          this.setState({ exists: null });
        }, 5000);
      } else if (data.data.created === true) {
        this.setState({ created: true });
        setTimeout(() => {
          window.location.replace("https://dndpal.herokuapp.com/");
        }, 1000);
      }
    }
  };

  render() {
    return (
      <>
        <div className="header-register">
          <h1>Registration Page</h1>
        </div>
        <div className="register-form">
          <input
            id="register"
            onChange={this.handleUser}
            name="username"
            type="text"
            placeholder="username..."
          />
          <input
            id="register"
            onChange={this.handleUser}
            name="password"
            type="password"
            placeholder="password..."
          />
          <br></br>
          I'm a...
          <select defaultValue="1" onChange={this.handleUser} name="player">
            <option value="1" disabled>
              Select Type:
            </option>
            <option>Adventurer</option>
            <option>Dungeon Master</option>
          </select>
          <button id="btn5" onClick={this.handleRegister}>
            Register
          </button>
          <p>
            Already have an account?
            <a href="/">Click HERE to Login</a>
          </p>
          {this.state.exists === true ? (
            <Alert variant={"warning"}>User already exists!</Alert>
          ) : null}
          {this.state.field === true ? (
            <Alert variant={"warning"}>
              Empty input fields are not allowed!!
            </Alert>
          ) : null}
          {this.state.created === true ? (
            <Alert variant={"success"}>
              Success! user created! Taking you to the login page...
            </Alert>
          ) : null}
        </div>
      </>
    );
  }
}

export default Register;
