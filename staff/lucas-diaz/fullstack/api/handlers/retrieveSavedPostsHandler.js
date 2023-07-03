const { retrieveSavedPosts } = require("../logic")
const { extractUserIdFromToken } = require("./helpers")

module.exports = (req, res) => {
    try {
        const userId = extractUserIdFromToken(req)

        retrieveSavedPosts(userId)
            .then(savedPosts => res.status(200).json(savedPosts))
            .catch(error => res.status(400).json({ error: error.message }))

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}