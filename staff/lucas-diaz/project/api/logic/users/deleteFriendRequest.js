require("dotenv").config()

const {
    validators: { validateId, validateText },
    errors: { ExistenceError }
} = require("com")
const { User } = require("../../data/models")

module.exports = function deleteFriendRequest(userId, requestedUsername) {
    validateId(userId)

    return (async () => {
        const user = await User.findById(userId)
        if (!user) throw new ExistenceError("user not found")

        const requestedUser = await User.findOne({ name: requestedUsername })
        if (!requestedUser) throw new ExistenceError("requested Friend not found")

        if (!user.friendRequests.includes(requestedUser.id)) throw new ExistenceError("Request not founded")

        await user.updateOne({ $pull: { friendRequests: requestedUser.id } });
    })()
}