require("dotenv").config()
const {
    validators: { validateId, validateText },
    errors: { ExistenceError, ContentError } } = require("com")
const { User } = require("../../data/models")



module.exports = function updateUserUsername(userId, newUsername) {
    validateId(userId)
    validateText(newUsername)

    return (async () => {
        const user = await User.findById(userId)

        if (!user) throw new ExistenceError("user not found")

        await user.updateOne({name: newUsername})
    })()
}