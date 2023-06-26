const { retrievePostByPostId } = require("../logic")
const {extractUserId} = require("../helpers")

module.exports = (req, res) => {
    try {
        const { postId } = req.params
        const userId = extractUserId(req)

        retrievePostByPostId(userId, postId)
            .then(post => res.status(200).json(post))
            .catch(error => res.status(400).json({ error: error.message }))

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}