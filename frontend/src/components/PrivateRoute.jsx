import React, { Component } from "react"
import { Route, Redirect } from "react-router-dom"


const PrivateRoute = ({ component: Component, ...rest}) => (
    <Route {...rest} render={(props) => 
        rest.isAuthenticated 
        ? <Component {...props} />
        : <Redirect to={rest.whereToRedirect || "/login"} />
    }/>
)

export default PrivateRoute