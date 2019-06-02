import React, { Component } from "react";
import { getusers } from "../UserFunctions";
import { Link } from "react-router-dom";
class Search extends Component {
  state = {
    name: "",
    users: []
  };
  componentWillMount() {
    const id = localStorage.usertoken;
    if (id === undefined) {
      this.props.history.push(`/`);
    } else {
      getusers().then(res => {
        this.setState(
          {
            users: res
          },
          function() {
            console.log(this.state.users);
          }
        );
      });
    }
  }
  setname = e => {
    this.setState({
      name: e.target.value
    });
  };

  render() {
    let filteredcust = this.state.users.filter(user => {
      return user.Firstname.indexOf(this.state.name) !== -1;
    });
    return (
      <div>
        <br />
        <div className="wrapper">
          <input
            className="input"
            placeholder="type the name"
            value={this.state.name}
            onChange={e => this.setname(e)}
          />
          <br />
          <div className="left">
            {filteredcust.map(each => (
              <div key={each.user_id}>
                <Link to={`/profile/${each.user_id}/My_info`}>
                  <div className="search grey">
                    firstname: {each.Firstname}
                    <br />
                    lastname: {each.Lastname}
                    <br />
                    username: {each.username}
                    <br />
                    email:{each.email}
                    <br />
                    <br />
                  </div>
                </Link>
                <br />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
