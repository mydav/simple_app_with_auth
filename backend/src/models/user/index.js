const mongoose = require("mongoose")
const passportLocalMongoose = require("passport-local-mongoose")

const userSchema = new mongoose.Schema({
    role: String
})

userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("m8d3User", userSchema)

