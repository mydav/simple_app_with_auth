const express = require("express")
const Tweet = require("../models/tweet")
const passport = require("passport")
const mongoose = require("mongoose")


const router = express.Router()

router.get("/", async (req, res) => {
    res.send(await Tweet.find())
})

router.post("/", passport.authenticate("jwt"), async(req, res)=>{
    req.body.userId = req.user._id
    const tweet = new Tweet(req.body)
    await tweet.save()
    res.send(tweet)
})

router.put("/:tweetId", passport.authenticate("jwt"), async(req, res)=>{
    const tweet = await Tweet.findById(req.params.tweetId)
    if (!tweet)
        return res.status(404).send("Not found")

    const converted =  new mongoose.Types.ObjectId(req.user._id); //we have to cast the string in a ObjectId and then use the .equals method
    if (!converted.equals(tweet.userId)) //don't try this at home! we have to fix the conversion instad of using the cast
        return res.status(401).send("You can only modify your posts")

    const resp = await Tweet.findByIdAndUpdate(req.params.tweetId, {
        text: req.body.text
    })

    res.send(resp)
})

router.get("/myTweets", passport.authenticate("jwt"), async (req, res)=>{
    res.send(await Tweet
        .find({ userId: req.user._id})
        .sort("-updatedAt"))
})


module.exports = router;