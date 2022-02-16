import React from "react";
import axios from "axios";
import { Alert } from "react-bootstrap";

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      exists: null,
      created: null,
    };
  }

  handleUsername = (e) => {
    this.setState({ username: e.target.value });
  };

  handlePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  handleRegister = async () => {
    const data = await axios.post("http://localhost:3001/register", {
      username: this.state.username,
      password: this.state.password,
    });
    if (data.data.exists === true) {
      this.setState({ exists: true });
    } else if (data.data.created === true) {
      this.setState({ created: true });
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
            onChange={this.handleUsername}
            name="username"
            type="text"
            placeholder="username..."
          />
          <input
            onChange={this.handlePassword}
            name="password"
            type="password"
            placeholder="password..."
          />
          <button onClick={this.handleRegister}>Register</button>
          <p>
            Already have an account?
            <a href="/">Click HERE to Login</a>
          </p>
          {this.state.exists === true ? (
            <Alert variant={"warning"}>User already exists!</Alert>
          ) : null}
          {this.state.created === true ? (
            <Alert variant={"success"}>Success! user created!</Alert>
          ) : null}
        </div>
      </>
    );
  }
}

export default Register;
