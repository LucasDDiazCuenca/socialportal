const { retrieveUser } = require("../logic")
const { extractUserIdFromToken } = require("./helpers")


module.exports =  (req, res) => {
    try {
        const userId = extractUserIdFromToken(req)

        retrieveUser(userId)
            .then(user => res.status(200).json(user))
            .catch(error => res.status(400).json({ error: error.message }))


    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}