require("dotenv").config()

const {
    validators: { validateId, validateText },
    errors: { ExistenceError, DuplicityError }
} = require("com")
const { User } = require("../../data/models")

module.exports = function sendFriendRequest(userId, requestedUsername) {
    validateId(userId)
    validateText(requestedUsername)

    return (async () => {
        const user = await User.findById(userId)
        if (!user) throw new ExistenceError("user not found")

        const requestedUser = await User.findOne({ name: requestedUsername })
        if (!requestedUser) throw new ExistenceError("requestedFriend not found")


        if (!requestedUser.friendRequests.includes(userId)) {
            await requestedUser.updateOne({ $push: { friendRequests: userId } });
        } else throw new DuplicityError("This request alredy exist")
    })()
}