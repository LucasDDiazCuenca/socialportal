const { readFile } = require("fs")
const { validators: {validateId} } = require('com') 

//those posts comes from retrievePosts

module.exports = function retrieveSavedPosts(userId, posts, callback){
    validateId(userId)

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

        if (foundUser.savedPosts.length > 0) {
            const savedPosts = posts.filter((post) => foundUser.savedPosts.includes(post.id));
    
            callback(null,savedPosts);
        } else {
            callback(null, []);
        }
    })
}