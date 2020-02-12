import React from 'react';
import '../App.css';
import { useState } from "react"
import {withRouter} from "react-router-dom"
import { connect }from "react-redux"

const mapStateToProps = state => state
const mapDispatchToProps = dispatch => ({
  setUserToken: base64 => dispatch({
    type:"SET_USERBASE64",
    payload: base64
  }) 
})


function RegisterComponent(props) {

  const [ username, setUsername] = useState("")
  const [ password, setPassword] = useState("")
  const [ role, setRole] = useState("user")
  const [ saveCredentials, setSaveCredentials] = useState(false)
  const [ error, setError] = useState(undefined)

  const register = async () => {
    //create my "token" starting from username and password
    //contact the APIs to prove identity
    const resp = await fetch("http://localhost:3500/user/signup", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        username,
        password,
        role
      })
    })

    if (resp.ok){
      const respJson = await resp.json();
      console.log(respJson)
      if (saveCredentials)
        localStorage.setItem("access_token", respJson.access_token)
        
      props.setUserToken(respJson.access_token)
      props.history.push("/profile")
    }
    else{
      //console log
      setError("Username and password incorrect")
      setUsername("")
      setPassword("")
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <input type="text" placeholder="username" value={username} onChange={e => setUsername(e.target.value)}></input>
        <input type="password" placeholder="*********" value={password} onChange={e => setPassword(e.target.value)}></input>
        <input type="text" placeholder="role" value={role} onChange={e => setRole(e.target.value)}></input>
        <span>Save Credentials?</span>
        <input type="checkbox" value={saveCredentials} onChange={e => setSaveCredentials(!saveCredentials)}/>
        <input type="button" onClick={register} value="Login"></input>
        {error && <h2>{error}</h2>}
      </header>
    </div>
  );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterComponent));
