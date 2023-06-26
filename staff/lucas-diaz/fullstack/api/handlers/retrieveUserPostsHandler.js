const { retrieveUserPosts } = require("../logic")
const { extractUserId } = require("../helpers")

module.exports = (req, res) => {
    try {
        const userId = extractUserId(req)

        retrieveUserPosts(userId)
            .then(posts =>  res.status(200).json(posts))
            .catch(error => res.status(400).json({ error: error.message }))
            
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}