import React, { Component } from "react";

import { user_info } from "../UserFunctions";

import Profilenav from "./Profilenav";
import "./profile.css";
class Profile extends Component {
  state = {
    user: {}
  };
  componentWillMount() {
    const id = localStorage.usertoken;

    if (id === undefined) {
      this.props.history.push(`/`);
    } else {
      user_info(id).then(res => {
        this.setState({
          user: res
        });
      });
    }
  }
  logout = () => {
    localStorage.removeItem("usertoken");
    this.props.history.push(`/`);
  };
  render() {
    return (
      <div>
        <div>
          <div className="user-text">
            {" "}
            Welcome {" " + this.state.user.username + " !!"}
          </div>
          <div className="right">
            <button className="but" onClick={() => this.logout()}>
              Log Out
            </button>
          </div>
        </div>
        <br />

        <Profilenav />
      </div>
    );
  }
}

export default Profile;
