const express = require("express")
const UserModel = require("../models/user")
const { getToken } = require("../utils/auth")
const passport = require("passport")
const router = express.Router()

//this creates a user starting from username and password
router.post("/signup", async (req, res) => {
    try{
        const user = await UserModel.register(req.body, req.body.password)
        // res.send(user)
        const token = getToken({ _id: user._id })
            res.send({
                access_token: token,
                user: user
            })
        }
    catch(exx){
        console.log(exx)
        res.status(500).send(exx)
    }
})

//this will check the user credentials (username and password in the body) and generate a new token
router.post("/signin", passport.authenticate("local"), async(req, res)=>{
    const token = getToken({ _id: req.user._id })
    res.send({
        access_token: token,
        user: req.user
    })
})

//this will check the user credentials (access token) and generate a new token
router.post("/refresh", passport.authenticate("jwt"), async(req, res)=>{
    const token = getToken({ _id: req.user._id })
    res.send({
        access_token: token,
        user: req.user
    })
})

//this will check the Authorization: Bearer Token and return the current user
router.get("/bankaccounts", passport.authenticate("jwt"), async (req, res)=>{
    res.send(req.user);
})

router.post("/changepassword", passport.authenticate("local"), async(req, res)=>{
        const user = await UserModel.findById(req.user._id)
        const result = await user.setPassword(req.body.newPassword)
        user.save() // <= remember to save the object, since setPassword is not committing to the db
        console.log(result) 
        res.send(result) 
    }
)

module.exports = router;