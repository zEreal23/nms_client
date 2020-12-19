import React from 'react'
import {Switch, Route} from 'react-router-dom'

import loginPage from './pages/auth/loginPage'
import registerPage from './pages/auth/registerPage'
import homePage from './pages/homePage'

const App = () => (
    <Switch>
      <Route exact path="/" component={homePage}/>
      <Route exact path="/login" component={loginPage}/>
      <Route exact path="/register" component={registerPage}/>
    </Switch>
  );


export default App;
