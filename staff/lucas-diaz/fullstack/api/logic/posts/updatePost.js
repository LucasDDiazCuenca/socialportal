const { readFile, writeFile } = require("fs")
const { validators: { validateId, validateUrl, validateText} } = require("com")

module.exports = function updatePost(userId, postId, image, text, callback){
    validateId(userId);
    validateUrl(image);
    validateText(text);

    readFile("./data/users.json", (error, json) => {
        if (error) {
            callback(error)
            return
        }

        const users = JSON.parse(json)
        const foundUser = users.find(_user => _user.id === userId)

        if (!foundUser) {
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

            if (foundUser.id !== foundPost.author) {
                callback(new Error("The current user Id doesnt belong to post Id"))
                return
            }

            foundPost.image = image
            foundPost.text = text


            json = JSON.stringify(posts, null, 4)

            writeFile("./data/posts.json", json, error => {
                if (error) {
                    callback(error)
                    return
                }
                callback(null)
            })
        })
    })
}