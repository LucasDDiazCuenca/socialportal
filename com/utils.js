const { validateToken } = require('./validators')

function extractPayloadFromToken(token) {
    return JSON.parse(atob(token.split('.')[1]))
}

function isTokenAlive(token) {
    const { iat, exp } = extractPayloadFromToken(token)
    const now = Date.now() / 1000

    return exp - iat > now - iat
}

function isTokenValid(token) {
    try {
        validateToken(token)

        return true
    } catch (_) {
        return false
    }
}

function extractSubFromToken(token) {
    const { sub } = extractPayloadFromToken(token)

    return sub
}

module.exports = {
    isTokenAlive,
    isTokenValid,
    extractSubFromToken
}