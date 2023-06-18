require("dotenv").config()
const express = require("express")
const { cors, jsonBodyParser } = require("./utils")
const { helloApiMid, registerUserMid, authenticateUserMid, retrieveUserMid, updateUserAvatarMid, updateUserPasswordMid, createPostMid, retrievePostsMid, retrieveSavedPostsMid, retrieveUserPostsMid, retrievePostByPostIdMid, toggleHidePostMid, toggleLikePostMid, toggleSavePostInUserMid, updatePostMid, deletePostMid } = require("./middlewares")

const api = express()
api.use(cors)
api.get("/", helloApiMid)

//!USERS
api.post("/users", jsonBodyParser, registerUserMid)

api.post("/users/auth", jsonBodyParser, authenticateUserMid)

api.get("/users", retrieveUserMid)

api.patch("/users/avatar", jsonBodyParser, updateUserAvatarMid)

api.patch("/users/password", jsonBodyParser, updateUserPasswordMid)

//!POSTS
api.post("/posts", jsonBodyParser, createPostMid)

api.get("/posts", retrievePostsMid)

api.get("/posts/saved", retrieveSavedPostsMid)

api.get("/posts/users", retrieveUserPostsMid)

api.get("/posts/:postId", retrievePostByPostIdMid)

api.patch("/posts/hide/:postId", toggleHidePostMid)

api.patch("/posts/like/:postId", toggleLikePostMid)

api.patch("/users/save/:postId", toggleSavePostInUserMid)

api.patch("/posts/update/:postId", jsonBodyParser, updatePostMid)

api.delete("/posts/delete/:postId", deletePostMid)

api.listen(process.env.PORT, () => console.log(`Process running in port ${process.env.PORT}`))


