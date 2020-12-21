import React from 'react'
import { Switch, Route } from 'react-router-dom'

import loginPage from './pages/auth/loginPage'
import registerPage from './pages/auth/registerPage'
import homePage from './pages/homePage'
import categoyPage from './pages/category/Category'
import menuPage from './pages/menu/Menu'
import staffPage from './pages/staff/Staff'
import tablePage from './pages/table/Table'
import Header from './components/nav/header'

const App = () => {
  return (
    <>
    <Header/>
      <Switch>
        <Route exact path="/" component={homePage} />
        <Route exact path="/login" component={loginPage} />
        <Route exact path="/register" component={registerPage} />
        <Route exact path="/category" component={categoyPage} />
        <Route exact path="/staff" component={staffPage} />
        <Route exact path="/menu" component={menuPage} />
        <Route exact path="/table" component={tablePage} />
      </Switch>
    </>
  )
}


export default App;
