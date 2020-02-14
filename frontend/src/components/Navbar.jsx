import React from "react"
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"
import { BehaviorSubject } from 'rxjs';
import {connect} from 'react-redux'

const mapStateToProps = state => state
const mapDispatchToProps = dispatch => ({
    setUserToken: base64 => dispatch({
      type:"SET_USERBASE64",
      payload: base64
    }) 
  })



function Navbar(props) {

    function logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('access_token');
       
        props.setUserToken(undefined)
    }

    return (
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            {!props.userToken ? <>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        </>
        : <>
        <Link to="/profile">Profile</Link>
        <Link onClick={logout} to="/login">Logout</Link>
        </>}
    </div>
    );
  }
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);