import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { login } from "../actions";
import { Alert } from "react-bootstrap";

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
    };
  }

  handleUsername = (e) => {
    this.setState({ username: e.target.value });
  };

  handlePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  handleLogin = async () => {
    const data = await axios.post("http://localhost:3001/login", {
      username: this.state.username,
      password: this.state.password,
    });
    console.log(data);
    if (data.data.isLoggedin === true) {
      this.setState({ isLoggedin: true });
      this.props.login(this.state.isLoggedin);
      const user = data.data.user;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("isAuthenticated", true);
      setTimeout(() => {
        window.location.replace("http://localhost:3000/home");
      }, 1000);
    } else if (data.data.exists === false) {
      this.setState({ exists: false });
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
          <button onClick={this.handleLogin}>Login</button>
          <p>
            Don't have an account?
            <a href="/register">Click HERE to Register</a>
          </p>
          {this.state.exists === false ? (
            <Alert variant={"danger"}>Username doesn't exist!</Alert>
          ) : null}
          {this.state.isLoggedin === true ? (
            <Alert variant={"success"}>Login successful!</Alert>
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
