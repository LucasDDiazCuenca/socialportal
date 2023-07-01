const { updateUserAvatar } = require("../logic")
const { extractToken } = require("../helpers")

module.exports = (req, res) => {
    try {
        const userId = extractToken(req)
        const { avatar } = req.body

        updateUserAvatar(userId, avatar)
            .then(() => res.status(204).send())
            .catch(error => res.status(404).json({ error: error.message }))

    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}