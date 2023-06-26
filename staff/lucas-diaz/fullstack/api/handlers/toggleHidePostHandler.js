const { toggleHidePost } = require("../logic")
const {extractUserId} = require("../helpers")

module.exports = (req, res) => {
    try {
        const userId = extractUserId(req)
        const { postId } = req.params

        toggleHidePost(userId, postId)
            .then(() => res.status(204).send())
            .catch(error => res.status(404).json({ error: error.message }))
        
        // toggleHidePost(userId, postId, error => {
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