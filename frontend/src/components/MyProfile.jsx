import React from "react"
import { connect} from "react-redux"
import Tweet from "./TweetComponent"

const mapStateToProps = state => state

class MyProfile extends React.Component {

    state= {
        tweets:[],
        text: ""
    }

    sendTweet = async () =>{
        const tweetsResp = await fetch("http://localhost:3500/tweets", {
            headers: {
                "Authorization": "Bearer " + this.props.userToken,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: this.state.text
            }),
            method: "POST"
        })
        const tweet = await tweetsResp.json();
        this.setState({ 
            tweets: [tweet, ...this.state.tweets] //this.state.tweets.concat(tweet)
            , text: ""})
    }

    render(){
        return <div>
            I'm authorized
            {/* {this.state.user && <h2>Hey i'm {this.state.user.username} and I'm {this.state.user.role}</h2> } */}
            {this.state.tweets.map((tweet, i) => <Tweet ket={i} tweet={tweet} />)}

            <input type="text" placeholder="new tweet" value={this.state.text} onChange={(e) => this.setState({text: e.target.value})} />
            <input type="button" onClick={this.sendTweet} />
        </div>
    }

    componentDidMount = async () =>{
        const tweetsResp = await fetch("http://localhost:3500/tweets/myTweets", {
            headers: {
                "Authorization": "Bearer " + this.props.userToken
            }
        })

        const tweets = await tweetsResp.json();
        console.log(tweets)
        this.setState({ tweets: tweets})
    }

}

export default connect(mapStateToProps)(MyProfile)