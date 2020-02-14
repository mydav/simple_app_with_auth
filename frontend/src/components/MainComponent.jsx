import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import LoginComponent from "./LoginComponent"
import MyProfile from "./MyProfile"
import Navbar from "./Navbar"
import PrivateRoute from "./PrivateRoute"
import RegisterComponent from "./RegisterComponent"
import { connect } from "react-redux"

const mapStateToProps = state => state
const mapDispatchToProps = dispatch => ({
    setUserToken: base64 => dispatch({
        type: "SET_USERBASE64",
        payload: base64
    })
})


class MainComponent extends React.Component {
    // state = {
    //     userAuth: undefined
    // }
    render() {
        return (
            <Router>
                <h1> Welcome to our app! Ready to login or register!</h1>
                <Navbar />
                <Switch>
                    
                    <Route path="/register">
                        <RegisterComponent />{/* setUserAuth={(userAuth) => this.setState({ userAuth: userAuth})} */}
                    </Route>
                    <Route path="/login">
                        <LoginComponent path="/profile" />{/* setUserAuth={(userAuth) => this.setState({ userAuth: userAuth})} */}
                    </Route>
                    
                    <PrivateRoute isAuthenticated={this.props.userToken} path="/profile" component={MyProfile} />

                    <PrivateRoute whereToRedirect="/userFailure" isAuthenticated={this.props.username === "Vadym"} path="/whatever" component={MyProfile} />
                </Switch>
            </Router>)
    }

    componentDidMount = async () => {
        const access_token = localStorage.getItem("access_token") //getting the access_token from  the local storage
        if (access_token) { //was the user already signed in?
            const response = await fetch("http://localhost:3500/user/refresh", { //is the token still valid?
                headers: { 
                    "Authorization": "Bearer " + access_token
                },
                method: "POST"
            })

            if (response.ok){ //if it's valid, i'm replacing the old one and send it to the store
                const userJson = await response.json();
                this.props.setUserToken(userJson.access_token)
                localStorage.setItem("access_token", userJson.access_token)
                
                console.log("token was ok, refreshed")
            }
            else{ //else, token is not valid, let me remove it!
                delete localStorage["access_token"]
                console.log("token was expired, removed")
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent)