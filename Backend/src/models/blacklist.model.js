const mongoose = require('mongoose');



const blackListSchema = new mongoose.Schema({
    token: {
        type: String,
        required: [true, "token is requred for blackListing"]
    }
}, {timestamps: true})




const blacklistModel = mongoose.model("blacklist", blackListSchema);;


module.exports = blacklistModel;
