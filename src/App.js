
import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from './Pages/home'
import TodoV2 from "./Pages/todoV2";
import 'antd/dist/antd.css';
import './index.css';

function App() {
  return (
    <div>
    <Router>
      <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/v2">
            <TodoV2 />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
