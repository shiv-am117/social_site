import React, { Component } from "react";

import "./App.css";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Profile from "./Components/Profile/Profile";

import {
  Switch,
  Route // for later
} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path={"/"} component={Login} />
          <Route exact path={"/Register"} component={Register} />
          <Route path={"/Profile/:id"} component={Profile} />
        </Switch>
      </div>
    );
  }
}

export default App;
