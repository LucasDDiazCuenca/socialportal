const { retrievePostByPostId } = require("../logic")
const { extractUserIdFromToken } = require("./helpers")

module.exports = (req, res) => {
    try {
        const { postId } = req.params
        const userId = extractUserIdFromToken(req)

        retrievePostByPostId(userId, postId)
            .then(post => res.status(200).json(post))
            .catch(error => res.status(400).json({ error: error.message }))

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}