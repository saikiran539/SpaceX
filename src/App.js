import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SpaceX from "./Components/SpaceX";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={SpaceX} />
      </Switch>
    </Router>
  );
}

export default App;
