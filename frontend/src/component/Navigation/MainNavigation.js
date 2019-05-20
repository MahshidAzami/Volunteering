import React from "react";
import { NavLink } from "react-router-dom";
import "./MainNavigation.css";

function MainNavigation(props) {
  return (
    <header className="main-navigation">
      <div className="main-navigation__logo">
        <h1>SPC Volunteering</h1>
      </div>
      <div className="main-navigation__items">
        <ul>
          <li>
            <NavLink to="/Opportunities">Opportunities</NavLink>
          </li>
          <li>
            <NavLink to="/Apply">Apply</NavLink>
          </li>
          <li>
            <NavLink to="/Requests">Requests</NavLink>
          </li>
          <li>
            <NavLink to="/Response">Response</NavLink>
          </li>
          <li>
            <NavLink to="/Login">Login</NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default MainNavigation;
