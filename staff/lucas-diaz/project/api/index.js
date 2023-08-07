//APIのインデックス

require("dotenv").config()
const mongoose = require("mongoose")
const express = require("express") 
const  cors  = require("cors")
const bodyParser = require("body-parser")

const { helloApiHandler, registerUserHandler, authenticateUserHandler, retrieveUserHandler, updateUserPasswordHandler, updateUserUsernameHandler, sendFriendRequestHandler, deleteFriendRequestHandler,addFriendHandler, deleteFriendHandler } = require("./handlers")

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        const api = express()

        const jsonBodyParser = bodyParser.json()

        api.use(cors())
        api.get("/", helloApiHandler)

        //!USERS
        api.post("/users", jsonBodyParser, registerUserHandler)
        api.post("/users/auth", jsonBodyParser, authenticateUserHandler)
        api.get("/users", retrieveUserHandler)
        api.patch("/users/password", jsonBodyParser, updateUserPasswordHandler)
        api.patch("/users/username", jsonBodyParser, updateUserUsernameHandler)
        api.patch("/users/friend-Request", jsonBodyParser, sendFriendRequestHandler)
        api.patch("/users/delete-friend-Request", jsonBodyParser, deleteFriendRequestHandler)
        api.patch("/users/add-friend", jsonBodyParser, addFriendHandler)
        api.patch("/users/delete-friend", jsonBodyParser, deleteFriendHandler)

        
        api.listen(process.env.PORT, () => console.log(`Process running in port ${process.env.PORT}`))

    })
    .catch(console.error)