import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import authService from "../../service/auth.service";
import "./Login.css";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      redirect: false,
      forbidden: false,
    };
    this.handleInputUsername = this.handleInputUsername.bind(this);
    this.handleInputPassword = this.handleInputPassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInputUsername(e) {
    this.setState({
      username: e.target.value,
      forbidden: false
    });
  }

  handleInputPassword(e) {
    this.setState({
      password: e.target.value,
      forbidden: false
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    authService.login(this.state.username, this.state.password).then((res) => {
      if (res.authenticated == true) {
        this.setState({
          redirect: true,
        });
      }
    }).catch(err =>{
      this.setState({
        forbidden: true,
      })
    })
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to="/host" />;
    }
    return (
      <div className="component-container">
        <div className="btn-done-div">
          <Link to="/">
            <button className="btn-play btn-done">HOME</button>
          </Link>
        </div>
        <div className="form">
          <form onSubmit={this.handleSubmit}>
          {this.state.forbidden?<label className="err">Username or Password incorrect!</label>:''}
            <div>
              <label htmlFor="username" className="text-label">
                Username
              </label>
              <input
                type="text"
                id="username"
                onChange={this.handleInputUsername}
                className="input"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                onChange={this.handleInputPassword}
                className="input"
              />
            </div>
            <div>
              <button type="submit" className="btn-enter">
                Login
              </button>
          <div>
            <Link to='/register'>
            <button  className="btn-enter">
                Register
              </button>
            </Link>
          </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(null, {})(Login);
