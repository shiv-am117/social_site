import React, { Component } from "react";
import { register } from "../UserFunctions";
import Navbar from "../Navbar/Navbar";
import "./Register.css";
class Register extends Component {
  constructor() {
    super();

    this.state = {
      msg: "",
      user: {
        fname: "",
        lname: "",
        uname: "",
        email: "",
        pass: "",
        dob: "",
        gender: ""
      },
      cp: "",
      p_cp: ""
    };
  }
  setuser = e => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState(
      { ...this.state, user: { ...this.state.user, [name]: value } },
      console.log(this.state)
    );
  };

  regquery = () => {
    console.log(this.state.user);
    register(this.state.user)
      .then(res => {
        console.log(res);
        let msg = res.data.sqlMessage;
        msg = msg === undefined ? "user Registered" : msg;
        this.setState({
          msg: msg,
          user: {
            fname: "",
            lname: "",
            uname: "",
            email: "",
            pass: "",
            dob: "",
            gender: ""
          },
          cp: "",
          p_cp: ""
        });
      })
      .catch(err => console.error(err));
  };

  register = e => {
    e.preventDefault();
    let msg = "";
    if (this.state.user.pass !== this.state.cp) {
      msg = "passwords do not match";
    } else {
      msg = "";
    }
    this.setState({
      ...this.state,
      msg
    });
    if (msg === "") this.regquery();
  };

  setcp = e => {
    let value = e.target.value;
    let msg = "";
    if (this.state.user.pass !== value) msg = "passwords do not match";
    else msg = "passwords match";
    this.setState(
      {
        ...this.state,
        cp: value,
        p_cp: msg
      },
      () => {
        console.log(this.state.p_cp);
      }
    );
  };
  render() {
    return (
      <div>
        <Navbar />
        <div className="wrapper">
          <div className="container">
            <form onSubmit={e => this.register(e)}>
              {this.state.msg}
              <br />
              First Name:
              <br />
              <input
                className="input"
                required="required"
                name="fname"
                value={this.state.user.fname}
                type="text"
                onChange={text => this.setuser(text)}
              />
              <br />
              <br />
              Last Name:
              <br />
              <input
                className="input"
                required="required"
                name="lname"
                value={this.state.user.lname}
                type="text"
                onChange={text => this.setuser(text)}
              />
              <br />
              <br />
              UserName:
              <br />
              <input
                className="input"
                required="required"
                name="uname"
                value={this.state.user.uname}
                type="text"
                onChange={text => this.setuser(text)}
              />
              <br />
              <br />
              Email:
              <br />
              <input
                className="input"
                required="required"
                name="email"
                value={this.state.user.email}
                type="email"
                onChange={text => this.setuser(text)}
              />
              <br />
              <br />
              Password:
              <br />
              <input
                className="input"
                required="required"
                name="pass"
                value={this.state.user.pass}
                type="password"
                onChange={text => this.setuser(text)}
              />
              <br />
              <br />
              Confirm Password:
              <br />
              <input
                className="input"
                required="required"
                name="cp"
                value={this.state.cp}
                type="password"
                onChange={text => this.setcp(text)}
              />
              {this.state.p_cp} <br />
              DOB:
              <br />
              <input
                className="input"
                required="required"
                name="dob"
                value={this.state.user.dob}
                type="date"
                onChange={text => this.setuser(text)}
              />
              <br />
              Gender:
              <br />
              <input
                className="input"
                required="required"
                name="gender"
                value={this.state.user.gender}
                type="text"
                onChange={text => this.setuser(text)}
              />
              <br />
              <button className="button">Register</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
