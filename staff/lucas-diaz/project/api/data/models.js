const mongoose = require("mongoose")

const { Schema, Schema: { Types: { ObjectId } }, model } = mongoose

const user = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }, 
    email: {
        type: String,
        required: true,
        unique: true,  
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 8
    },
    avatar: {
        type: Array ,
        default: []
    }, 
    friends:{
        type: [ObjectId],
        reqired: true,
        default: []
    },
    connected:{
        type: Boolean,
        required: true,
        default: false
    }
})

const User = model("User", user)


module.exports = {
    User
}