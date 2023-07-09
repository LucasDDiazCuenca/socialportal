require("dotenv").config()
const { 
    validators: { validateId },
    errors: {ExistenceError}
} = require("com")
const { User, Post } = require("../../data/models")

/**
 * 
 * @param {string} userId The user's id
 * @returns {Promise<Object>} Returns all the public posts
 * 
 * @throws {ContentError } On empty id (sync)
 * @throws {TypeError} On non-string id (sync)
 * 
 * @throws {ExistenceError} On user not found (async)
 */

module.exports = function retrievePosts(userId) {
    validateId(userId);

    return User.findById(userId)
        .then(user => {
            if (!user) throw new ExistenceError("user not found")

            return Promise.all([User.find().lean(), Post.find().lean()])
                .then(([users, posts]) => {
                    posts.forEach(post => {
                        const _user = users.find(user => user._id.toString() === post.author.toString())

                        post.author = {
                            id: _user._id.toString(),
                            name: _user.name,
                            avatar: _user.avatar
                        }
                        post.likeCounterNumber = post.likeCounter.length

                        if (post.likeCounter.some(userId => userId.equals(user._id))) {
                            post.likeCounter = true
                        } else {
                            post.likeCounter = false
                        }

                        if (user._id.toString() === post.author.id) {
                            post.userProperty = true
                        } else {
                            post.userProperty = false
                        }
                    });
                    const _posts = posts.filter(post => {
                        if (post.author.id === userId) {
                            return post.author.id === userId
                        } else if (post.author.id !== userId) {
                            return post.visibility === "public"
                        }
                    })

                    _posts.forEach(post => delete post.author.id)
                    return _posts.reverse()
                });
        });
}
