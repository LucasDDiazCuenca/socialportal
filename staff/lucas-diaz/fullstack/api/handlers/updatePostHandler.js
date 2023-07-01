const { updatePost } = require("../logic")
const {extractToken} = require("../helpers")

module.exports = (req, res) => {
    try {
        const userId = extractToken(req)
        const { postId } = req.params
        const { image, text } = req.body

        updatePost(userId, postId, image, text)
            .then(() => res.status(204).send())
            .catch(error => res.status(404).json({ error: error.message }))

    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}