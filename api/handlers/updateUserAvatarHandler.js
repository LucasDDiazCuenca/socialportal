const { updateUserAvatar } = require("../logic")
const { extractUserIdFromToken, handleErrors } = require("./helpers")

module.exports = handleErrors((req, res) => {
    const userId = extractUserIdFromToken(req)
    const { avatar } = req.body

    return updateUserAvatar(userId, avatar)
        .then(() => res.status(204).send())
})