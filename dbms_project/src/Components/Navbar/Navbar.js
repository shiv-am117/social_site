import React, { Component } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
class Navbar extends Component {
  render() {
    return (
      <div className="nav-main navbar">
        <ul className="nav-content">
          <li className="nav-text">
            <Link to="/Register">Register</Link>
          </li>
          {" | "}
          <li>
            <Link to="/">Login</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Navbar;
