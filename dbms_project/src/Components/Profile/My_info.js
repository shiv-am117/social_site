import React, { Component } from "react";
import { check_follow_db } from "../UserFunctions";
import { user_info } from "../UserFunctions";
import { follow } from "../UserFunctions";
import { unfollow } from "../UserFunctions";
class My_info extends Component {
  state = {
    user1: "",
    user2: {},
    same_user: true,
    follow: false
  };

  check_user = () => {
    if (this.state.user1 == this.state.user2.user_id) {
      this.setState({
        ...this.state,
        same_user: true
      });
    } else {
      this.setState({
        ...this.state,

        same_user: false
      });
    }
  };

  componentWillMount() {
    const id = localStorage.usertoken;
    let user2 = this.props.match.url;
    let parts = user2.split("/");
    if (id === undefined) {
      this.props.history.push(`/`);
    } else {
      user_info(parts[2]).then(res => {
        this.setState(
          {
            ...this.state,
            user1: id,
            user2: res
          },
          function() {
            this.check_user();
            this.check_follow();
          }
        );
      });
    }
  }
  check_follow() {
    check_follow_db(this.state.user1, this.state.user2.user_id).then(res => {
      if (res) {
        this.setState({
          ...this.user,
          follow: true
        });
      } else {
        this.setState({
          ...this.user,
          follow: false
        });
      }
    });
  }
  follow = () => {
    if (!this.state.follow) {
      follow(this.state.user1, this.state.user2.user_id).then(res => {
        if (res) {
          this.setState({
            ...this.user,
            follow: true
          });
        }
      });
    } else {
      unfollow(this.state.user1, this.state.user2.user_id).then(res => {
        if (res) {
          this.setState({
            ...this.user,
            follow: false
          });
        }
      });
    }
  };
  render() {
    var fol = this.state.same_user ? (
      <button className="button-my" onClick={() => this.rem_acc()}>
        Remove Account
      </button>
    ) : (
      <button className="button-my" onClick={() => this.follow()}>
        {this.state.follow ? "unfollow" : "follow"}
      </button>
    );
    return (
      <div className="mycont">
        <div className="mywrapper">
          <div className="myinfo">
            username:{this.state.user2.username}
            <br />
            firstname:{this.state.user2.Firstname}
            <br />
            lastname:{this.state.user2.Lastname}
            <br />
            email:{this.state.user2.email}
            <br />
          </div>
          {fol}
        </div>
      </div>
    );
  }
}

export default My_info;
