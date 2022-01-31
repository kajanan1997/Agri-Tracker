import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import auth from './auth-helper'

const PrivateRoute = ({ component: Component,role, ...rest }) => (
  <Route {...rest} render={props => {
     if(auth.isAuthenticated() && auth.isAuthenticated().user.role === role){
         return <Component {...props}/>
     }
     else if((auth.isAuthenticated() && role === "Any") || auth.isAuthenticated() && auth.isAuthenticated().user.role === "Admin" ){
         return <Component {...props}/>
     }
     else if (auth.isAuthenticated()){
         return <Redirect to={{
             pathname: '/',
             state: { from: props.location }
         }}/>
     }else{
        return(<Redirect to={{
             pathname: '/signin',
             state: { from: props.location }
         }}/>)
     }
  }
  }/>
)

export default PrivateRoute
