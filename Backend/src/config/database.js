const mongoose = require("mongoose");



function connectToDB() {
    mongoose.connect(process.env.MONGO_URI)

    .then(() => {
        console.log("Connected to Database!");
    })

    .catch((err) => {
        console.log("Error connectiong to DB", err);
    })
}



module.exports = connectToDB;