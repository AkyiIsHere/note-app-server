const mongoose = require('mongoose');

const url = process.env.MONGODB_URL;

const connetToDB = async () => {
    try {
        await mongoose.connect(url);
        console.log("Connected to MongoDB successfully...")
    } catch (error) {
        console.log("Error connect to MongoDB", error)
    }
}

module.exports = connetToDB;