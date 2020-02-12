import React from "react"
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"
import { BehaviorSubject } from 'rxjs';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('access_token')));

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('access_token');
    currentUserSubject.next(null);
    
}

function Navbar() {
    return (
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/profile">Profile</Link>
        <Link onClick={logout} to="/login">Logout</Link>
    </div>
    );
  }
export default Navbar;