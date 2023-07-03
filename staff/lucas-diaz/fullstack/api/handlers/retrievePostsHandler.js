const { retrievePosts } = require("../logic")
const { extractUserIdFromToken } = require("./helpers")


module.exports = (req, res) => {
    try {
        const userId = extractUserIdFromToken(req)

        retrievePosts(userId)
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error: error.message }))
        
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}