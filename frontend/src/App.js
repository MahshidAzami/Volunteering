import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import "./App.css";
import Opportunities from "./pages/Opportunities/Opportunities";
import Apply from "./pages/Apply/Apply";
import Login from "./pages/Login/Login";
import Requests from "./pages/Requests/Requests";
import Response from "./pages/Response/Response";
import MainNavigation from "./component/Navigation/MainNavigation";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <MainNavigation />
        <main className="main-content">
          <Switch>
            <Route exact path="/" component={Opportunities} />
            <Route path="/opportunities" component={Opportunities} />
            <Route path="/Apply" component={Apply} />
            <Route path="/Login" component={Login} />
            <Route path="/Requests" component={Requests} />
            <Route path="/Response" component={Response} />
          </Switch>
        </main>
      </BrowserRouter>
    );
  }
}

export default App;
