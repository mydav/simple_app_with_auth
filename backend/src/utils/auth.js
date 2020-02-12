const LocalStrategy = require("passport-local") // strategy to verify username and password
const JwtStrategy = require("passport-jwt").Strategy // strategy to verify the access token
const ExtractJwt = require("passport-jwt").ExtractJwt // this is a helper to extract the info from the token
const UserModel = require("../models/user")
const passport = require("passport")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()

//1) We need to specify to passport how we are gonna handle serialization and deserialization of the UserModel
passport.serializeUser(UserModel.serializeUser())
passport.deserializeUser(UserModel.deserializeUser())

passport.use(new LocalStrategy(UserModel.authenticate())) // this strategy will be used when we ask passport to passport.authenticate("local")

//-----------------JWT AREA-------------------------------------
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //Authorization: Bearer TOKEN
    secretOrKey: process.env.TOKEN_PASSWORD //
}

passport.use(new JwtStrategy(jwtOptions, (jwtPayload, callback) =>{ //this strategy will be used when we ask passport to passport.authenticate("jwt")
    UserModel.findById(jwtPayload._id, (err, user) => { //looks into the collection
        if (err) return callback(err, false) // ==> Something went wrong getting the info from the db
        else if (user) return callback(null, user) // ==> Existing user, all right!
        else return callback(null, false) // ==> Non existing user
    })
    // try{
    //     const user = await UserModel.findById(jwtPayload._id)
    //     if (user)
    //         return callback(null, user)
    //     else 
    //         return callback(null, false)
    // }   
    // catch(exx){
    //     return callback(exx, false)
    // } 
}))
//-----------------JWT AREA-------------------------------------

module.exports = {
    getToken: (user) => jwt.sign(user, jwtOptions.secretOrKey, { expiresIn: 3600 }) //this is just an helper to have a central point for token generation
}