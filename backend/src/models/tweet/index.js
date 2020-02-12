const mongoose = require("mongoose")

const tweetSchema = new mongoose.Schema({
    text: {
        type:String,
        required: true
    },
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'm8d3User'}
}, { timestamps: true })

module.exports = mongoose.model("m8d3Tweet", tweetSchema)

