import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Base from "./components/Base";
import Home from "./components/Home";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/game' exact component={Base} />
      </Switch>
    </Router>
  );
};

export default Routes;
