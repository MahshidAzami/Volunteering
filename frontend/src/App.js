import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import "./App.css";
import Opportunities from "./pages/Opportunities/Opportunities";
import Apply from "./pages/Apply/Apply";
import Login from "./pages/Login/Login";
import Requests from "./pages/Requests/Requests";

import MainNavigation from "./component/Navigation/MainNavigation";
import Authcontext from "./context/Authcontext";

class App extends Component {
  state = {
    token: null,
    userId: null
  };

  login = (token, userId) => {
    this.setState({ token: token, userId: userId });
  };

  logout = () => {
    this.setState({ token: null, userId: null });
  };

  render() {
    return (
      <BrowserRouter>
        <Authcontext.Provider
          value={{
            token: this.state.token,
            userId: this.state.userId,
            login: this.login,
            logout: this.logout
          }}
        >
          <MainNavigation />
          <main className="main-content">
            <Switch>
              {this.state.token && <Redirect from="/login" to="/requests" />}
              <Redirect exact from="/" to="/opportunities" />
              <Route path="/opportunities" component={Opportunities} />
              <Route path="/apply" component={Apply} />
              <Route path="/login" component={Login} />
              {this.state.token && (
                <Route path="/requests" component={Requests} />
              )}
            </Switch>
          </main>
        </Authcontext.Provider>
      </BrowserRouter>
    );
  }
}

export default App;
