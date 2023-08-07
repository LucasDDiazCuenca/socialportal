const { createAvatar } = require("../logic")
const { extractUserIdFromToken, handleErrors } = require("./helpers")


module.exports = handleErrors((req, res) => {
    const userId = extractUserIdFromToken(req)

    const { name, personality, age, state, hair, skin, shirt, trousers, shoes, emotions } = req.body
    return createAvatar(userId, name, personality, age, state, hair, skin, shirt, trousers, shoes, emotions)
        .then(() => res.status(204).send())

})

