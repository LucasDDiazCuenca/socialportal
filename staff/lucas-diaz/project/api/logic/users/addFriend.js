require("dotenv").config()

const {
    validators: { validateId, validateText },
    errors: { ExistenceError }
} = require("com")
const { User } = require("../../data/models")

module.exports = function addFriend(userId, requestedUsername) {
    validateId(userId)
    validateText(requestedUsername)

    return (async () => {
        const user = await User.findById(userId)
        if (!user) throw new ExistenceError("user not found")

        const requestedUser = await User.findOne({ name: requestedUsername })
        if (!requestedUser) throw new ExistenceError("requestedFriend wasnt found")


        if (!user.friendRequests.includes(requestedUser.id)) throw new ExistenceError("This request doesnt exist")

        await user.updateOne({ $push: { friends: requestedUser.id } });
        await requestedUser.updateOne({ $push: { friends: user.id } });

        await user.updateOne({ $pull: { friendRequests: requestedUser.id } })
    })()
}