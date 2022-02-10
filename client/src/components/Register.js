import React from "react";
import axios from "axios";

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
    };
  }

  handleUsername = (e) => {
    this.setState({ username: e.target.value });
  };

  handlePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  handleRegister = () => {
    axios.post("http://localhost:3001/register", {
      username: this.state.username,
      password: this.state.password,
    });
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
            <a href="/login">Click HERE to Login</a>
          </p>
        </div>
      </>
    );
  }
}

export default Register;
