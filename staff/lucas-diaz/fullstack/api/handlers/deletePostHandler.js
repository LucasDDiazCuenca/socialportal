const { deletePost } = require("../logic")
const {extractToken} = require("../helpers")

module.exports = (req, res) => {
    try {
        const userId = extractToken(req)
        const { postId } = req.params


        deletePost(userId, postId)
            .then(() => res.status(204).send())
            .catch(error => res.status(404).json({ error: error.message }))

        // deletePost(userId, postId, error => {
        //     if (error) {
        //         res.status(404).json({ error: error.message })
        //         return
        //     }
        //     res.status(204).send()
        // })

    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}