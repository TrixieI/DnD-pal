import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { login } from "../actions";
import { Alert } from "react-bootstrap";
import "../App.css";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      isLoggedin: false,
      exists: null,
      incorrectPassword: null,
      name: "",
      player: "",
    };
  }

  handleUsername = (e) => {
    this.setState({ username: e.target.value });
  };

  handlePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  handleLogin = async () => {
    const { username, password } = this.state;
    if (username === "" && password === "") {
      this.setState({ field: true });
      setTimeout(() => {
        this.setState({ field: null });
      }, 5000);
    } else {
      const data = await axios.post("https://dndpal.herokuapp.com/login", {
        username: this.state.username,
        password: this.state.password,
        player: this.state.player,
      });
      if (data.data.isLoggedin === true) {
        this.setState({ isLoggedin: true });
        this.props.login(this.state.isLoggedin);
        const user = data.data.user;
        const player = data.data.info[0]?.player;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("player", JSON.stringify(player));
        localStorage.setItem("isAuthenticated", true);
        setTimeout(() => {
          window.location.replace("https://dndpal.herokuapp.com/home");
        }, 1000);
      } else if (data.data.exists === false) {
        this.setState({ exists: false });
        setTimeout(() => {
          this.setState({ exists: null });
        }, 5000);
      }
    }
  };

  render() {
    return (
      <>
        <div className="header-login">
          <h1>Login Page</h1>
        </div>
        <div className="login-form">
          <input
            id="login"
            onChange={this.handleUsername}
            name="username"
            type="text"
            placeholder="username..."
          />
          <input
            id="login"
            onChange={this.handlePassword}
            name="password"
            type="password"
            placeholder="password..."
          />
          <button id="btn5" onClick={this.handleLogin}>
            Login
          </button>
          <p>
            Don't have an account?
            <a href="/register">Click HERE to Register</a>
          </p>
          {this.state.exists === false ? (
            <Alert variant={"danger"}>
              Incorrect username or password! please try again...
            </Alert>
          ) : null}
          {this.state.isLoggedin === true ? (
            <Alert variant={"success"}>
              Login successful! logging you in...
            </Alert>
          ) : null}
          {this.state.field === true ? (
            <Alert variant={"warning"}>
              Empty input fields are not allowed!!
            </Alert>
          ) : null}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedin: state.isLoggedin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (data) => dispatch(login(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
