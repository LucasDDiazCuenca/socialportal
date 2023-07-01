const { retrievePosts } = require("../logic")
const {extractToken} = require("../helpers")


module.exports = (req, res) => {
    try {
        const userId = extractToken(req)

        retrievePosts(userId)
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error: error.message }))
        
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}