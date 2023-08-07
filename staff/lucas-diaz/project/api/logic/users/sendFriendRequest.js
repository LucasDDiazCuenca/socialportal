require("dotenv").config()

const {
    validators: { validateId, validateText },
    errors: { ExistenceError, DuplicityError }
} = require("com")
const { User } = require("../../data/models")
const { Types: { ObjectId } } = require("mongoose")

module.exports = function sendFriendRequest(userId, requestedUsername) {
    validateId(userId)
    validateText(requestedUsername)

    return (async () => {
        const user = await User.findById(userId)
        if (!user) throw new ExistenceError("user not found")

        const requestedUser = await User.findOne({ name: requestedUsername })
        if (!requestedUser) throw new ExistenceError("requestedFriend not found")


        if (requestedUser.friendRequests.includes(userId)) throw new DuplicityError("This request alredy exist")


        await requestedUser.updateOne({ $push: { friendRequests: new ObjectId(userId) } })
    })()
}


//TODO improve code when we dont have duplicity in friends requests BUT we already are friends. 