import React, { Component } from "react";
import { login } from "../UserFunctions";
import Navbar from "../Navbar/Navbar";
import "./Login.css";
class Login extends Component {
  state = {
    user: { name: "", pass: "" },
    msg: ""
  };
  componentDidMount() {
    const id = localStorage.usertoken;
    if (id !== undefined) {
      this.props.history.push(`/profile/${id}`);
    }
  }
  seeuser = e => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      ...this.state,
      user: { ...this.state.user, [name]: value }
    });
  };

  submit = e => {
    e.preventDefault();
    login(this.state.user).then(res => {
      if (res) {
        if (res.data === "incorrect username or password") {
          this.setState({
            ...this.state,
            msg: res.data
          });
        } else {
          this.props.history.push(`/Profile/${res}`);
        }
      }
    });
  };
  render() {
    return (
      <div>
        <Navbar />
        <div className="wrapper">
          <div className="container">
            {this.state.msg}
            <form onSubmit={e => this.submit(e)}>
              User Name: <br />
              <input
                className="input"
                type="text"
                name="name"
                required="required"
                value={this.state.user.name}
                onChange={e => this.seeuser(e)}
              />{" "}
              <br />
              Password: <br />
              <input
                className="input"
                type="password"
                name="pass"
                required="required"
                onChange={e => this.seeuser(e)}
              />{" "}
              <br />
              <button className="button">Login</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
