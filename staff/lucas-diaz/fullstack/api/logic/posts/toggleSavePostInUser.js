const { readFile, writeFile } = require("fs")
const { validators: { validateId } } = require("com")

module.exports = function toggleSavePostInUser(userId, postId, callback) {
    validateId(userId)
    validateId(postId)

    readFile("./data/users.json", (error, json) => {
        if (error) {
            callback(error)
            return
        }

        const users = JSON.parse(json)
        const user = users.find(_user => _user.id === userId)

        if (!user) {
            callback(new Error("user not found"))
            return
        }

        readFile("./data/posts.json", (error, json) => {
            if (error) {
                callback(error)
                return
            }
            const posts = JSON.parse(json)
            const foundPost = posts.find(post => post.id === postId)

            if (!foundPost) {
                callback(new Error("post not found"))
                return
            }

            if (user.savedPosts.includes(foundPost.id)){
                const index = user.savedPosts.indexOf(foundPost.id)
                user.savedPosts.splice(index,1)
                

                //si no lo tiene pushear el id del post 
            }else if (!user.savedPosts.includes(foundPost.id)){
                user.savedPosts.push(foundPost.id)
            }
            
            json = JSON.stringify(users, null, 4)

            writeFile("./data/users.json", json, error => {
                if (error) {
                    callback(error)
                    return
                }
                callback(null)
            })
        })
    })
}