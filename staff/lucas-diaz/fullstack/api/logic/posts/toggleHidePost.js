require("dotenv").config()
const {
    validators: { validateId },
    errors: { ExistenceError, AuthError }
} = require("com")
const { User, Post } = require("../../data/models")

/**
 * 
 * @param {string} userId The user's id
 * @param {string} postId The post's id
 * @returns {void} Doesn't return anything
 * 
 * @throws {ContentError } On empty id (sync)
 * @throws {TypeError} On non-string id (sync)
 * 
 * @throws {ExistenceError} On user not found (async)
 * @throws {AuthError} On failed correlation on db and provided data in order to authorize this action(async)
 */


module.exports = function toggleHidePost(userId, postId) {
    validateId(userId)
    validateId(postId)


    return User.findById(userId)
        .then(user => {
            if (!user) throw new ExistenceError("user not found")

            return Post.findById(postId)
                .then(post => {
                    console.log(post.author.toString())
                    console.log(user._id.toString())
                    console.log(post.visibility)

                    if (user._id.toString() !== post.author.toString()) throw new AuthError("this user has not permition to hide this post")

                    if (post.visibility === "public") {
                        return post.updateOne({ visibility: "private" })

                    } else {
                        return post.updateOne({ visibility: "public" })
                    }
                })
        })
}