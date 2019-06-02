import React, { Component } from "react";
import { Link, Switch, Route } from "react-router-dom";

import My_info from "./My_info";
import My_images from "./My_images";
import Social from "./Social";
import Search from "./Search";

class Profilenav extends Component {
  state = {
    match: this.props.match
  };
  render() {
    return (
      <div>
        <div className="nav-main ">
          <ul className="nav-content">
            <Link to={`/profile/${localStorage.usertoken}/My_images`}>
              My_images
            </Link>
            {" | "}
            <Link to={`/profile/${localStorage.usertoken}/social`}>Social</Link>
            {" | "}
            <Link to={`/profile/${localStorage.usertoken}/My_info`}>
              My_info
            </Link>
            {" | "}
            <Link to={`/profile/${localStorage.usertoken}/search`}>Search</Link>
          </ul>
        </div>
        <Switch>
          <Route
            path={`/profile/:id/My_images`}
            render={props => <My_images {...props} user={this.state.user} />}
          />
          <Route
            path={`/profile/:id/social`}
            render={props => <Social {...props} user={this.state.user} />}
          />

          <Route path={`/profile/:id/My_info`} component={My_info} />
          <Route path={`/profile/:id/Search`} component={Search} />
        </Switch>
      </div>
    );
  }
}

export default Profilenav;
