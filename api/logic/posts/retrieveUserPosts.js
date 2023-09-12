require("dotenv").config()
const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com')
const { User, Post } = require("../../data/models")

/**
 * 
 * @param {string} userId The user's id
 * @returns {Promise<Object>} Returns all the user's posts 
 * 
 * @throws {ContentError } On empty id (sync)
 * @throws {TypeError} On non-string id (sync)
 * 
 * @throws {ExistenceError} On user not found (async)
 */


module.exports = function retrieveUserPosts(userId) {
    validateId(userId);

    return (async () => {
        const user = await User.findById(userId).lean()
        if (!user) throw new ExistenceError("user not found")

        let userPosts = await Post.find({ author: user._id }).populate("author", "-password -savedPosts").lean()

        userPosts.forEach(post => {
            post.author._id = post.author._id.toString()
            post.likeCounterNumber = post.likeCounter.length

            if (post.likeCounter.some(userId => userId.equals(user._id))) {
                post.likeCounter = true
            } else {
                post.likeCounter = false
            }

            if (user._id.toString() === post.author._id) {
                post.userProperty = true
            } else {
                post.userProperty = false
            }
        });

        userPosts.forEach(post => {
            delete post.author._id
            delete post.author.__v
            delete post.__v
        })
        return userPosts.reverse()
    })()
}



