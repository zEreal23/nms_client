import React,{useEffect} from 'react'
import { Switch, Route } from 'react-router-dom'
import { ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

import loginPage from './pages/auth/loginPage'
import fpPage from './pages/auth/ForgotPassword'
import homePage from './pages/homePage'
import categoyPage from './pages/category/Category'
import menuPage from './pages/menu/Menu'
import staffPage from './pages/staff/Staff'
import staffCompletePage from './pages/staff/StaffComplete'
import tablePage from './pages/table/Table'
import Header from './components/nav/header'

import {auth} from './firebase'
import {useDispatch} from 'react-redux'

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if(user){
        const idTokenResult = await user.getIdTokenResult()
        console.log(user)
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            email: user.email,
            token: idTokenResult.token,
          }
        })
      }
    })
    return () => unsubscribe();
  }, [])
  return (
    <>
    <Header/>
    <ToastContainer/>
      <Switch>
        <Route exact path="/home" component={homePage} />
        <Route exact path="/login" component={loginPage} />
        <Route exact path="/forgor/password" component={fpPage} />
        <Route exact path="/category" component={categoyPage} />
        <Route exact path="/staff" component={staffPage} />
        <Route exact path="/staff/complete" component={staffCompletePage} />
        <Route exact path="/menu" component={menuPage} />
        <Route exact path="/table" component={tablePage} />
      </Switch>
    </>
  )
}


export default App;
