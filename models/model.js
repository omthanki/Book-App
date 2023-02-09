const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required:true,
        unique: true,
        lowercase: true,
        trim: true
    },
    mobile: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
})

const userModel = mongoose.model("User", userSchema)
const bookModel = mongoose.model("Book", bookSchema)

module.exports = {userModel, bookModel}