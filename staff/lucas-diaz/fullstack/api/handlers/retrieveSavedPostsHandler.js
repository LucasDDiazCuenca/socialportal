const { retrieveSavedPosts } = require("../logic")
const { extractToken } = require("../helpers")

module.exports = (req, res) => {
    try {
        const userId = extractToken(req)

        retrieveSavedPosts(userId)
            .then(savedPosts => res.status(200).json(savedPosts))
            .catch(error => res.status(400).json({ error: error.message }))

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}