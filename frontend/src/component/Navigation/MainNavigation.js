import React from "react";
import { NavLink } from "react-router-dom";
import "./MainNavigation.css";
import Authcontext from "../../context/Authcontext";

const MainNavigation = props => (
  <Authcontext.Consumer>
    {context => {
      return (
        <header className="main-navigation">
          <div className="main-navigation__logo">
            <h1>SPC Volunteering</h1>
          </div>
          <div className="main-navigation__items">
            <ul>
              <li>
                <NavLink to="/opportunities">Opportunities</NavLink>
              </li>
              <li>
                <NavLink to="/apply">Apply</NavLink>
              </li>
              {context.token && (
                <li>
                  <NavLink to="/requests">Requests</NavLink>
                </li>
              )}
              {context.token && (
                <li>
                  <NavLink to="/response">Response</NavLink>
                </li>
              )}
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            </ul>
          </div>
        </header>
      );
    }}
  </Authcontext.Consumer>
);

export default MainNavigation;
