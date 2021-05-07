import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import {LoginModule, RegistrationModule} from "./components/loginManager/LoginManager";

import "./index.css"



function App() {
  return (
      <>
          <Router>
              <div className="Wrapper">
                  <Switch>
                      <Route path="/login">
                          <LoginModule />
                      </Route>
                      <Route path="/registration">
                          <RegistrationModule />
                      </Route>
                  </Switch>
              </div>
          </Router>
      </>
  );
}

export default App;
