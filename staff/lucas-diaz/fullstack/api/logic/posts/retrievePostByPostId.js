const { readFile } = require("fs")
const { validators: {validateId} } = require('com') 

module.exports = function retrievePostByPostId (userId, postId, callback) {
    validateId(userId)
    validateId(postId)

    readFile("./data/users.json",  (error, json) => {
        if (error) {
            callback(error)
            return
        }
        const users = JSON.parse(json)
        //buscar user 
        const user = users.find(user => user.id === userId)

        if (!user) {
            callback(new Error("User not found"))
            return
        }

        readFile("./data/posts.json", (error, json) => {
            if(error){
                callback(error)
                return
            }
            
            const posts = JSON.parse(json)
            const post = posts.find(post => post.id === postId)

            callback(null, post)
        })
    })
} 