import React, { Component } from "react";
import { HashRouter } from "react-router-dom";

import Main from "./Main/Main";

// import preload from "./data.json";
import "../node_modules/material-components-web/dist/material-components-web.css";
import "./App.css";

import preload from "./data.json";

class App extends Component {
  setToLocalStorage(itemName) {
    if (!this.isInLocalStorage(itemName)) {
      localStorage.setItem(itemName, JSON.stringify(preload[itemName]));
    }
  }

  isInLocalStorage(itemName) {
    return localStorage.getItem(itemName) ? true : false;
  }

  componentDidMount() {
    this.setToLocalStorage("chat");
    this.setToLocalStorage("history");
    this.setToLocalStorage("stickers");
  }

  render() {
    return (
      <HashRouter>
        <Main />
      </HashRouter>
    );
  }
}

export default App;
