import React, { Component } from "react";
import Router from "./router";
import { BrowserRouter } from "react-router-dom";
import "./App.scss";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Router />
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
