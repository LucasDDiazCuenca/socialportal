const { readFile } = require("fs")
const { validators: {validateId} } = require('com') 

//those posts comes from retrievePosts

module.exports = function retrieveUserPosts(userId, posts, callback){
    validateId(userId);

    readFile("./data/users.json",  (error, json) => {
        if (error) {
            callback(error)
            return
        }
        const users = JSON.parse(json)
        //buscar user 
        const foundUser = users.find(user => user.id === userId)

        if (!foundUser) {
            callback(new Error("User not found"))
            return
        }

        const userPosts = posts.filter(post => {
            return post.author.id === foundUser.id
        })

        callback(null, userPosts)
    })
}