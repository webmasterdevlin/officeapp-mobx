import React, { Component } from "react";
import Router from "./router";
import { BrowserRouter } from "react-router-dom";
import DevTools from "mobx-react-devtools";
import "./App.scss";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <>
          <Router />
          <DevTools />
        </>
      </BrowserRouter>
    );
  }
}

export default App;
