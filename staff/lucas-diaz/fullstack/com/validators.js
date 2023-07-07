const { ContentError } = require("./errors")

/**
 * 
 * @param {string} email An email 
 */

function validateEmail(email) {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    if (!email) throw new ContentError("Email is empty")
    if (typeof email !== "string") throw new TypeError("Email is not a string");
    if (email === " ") throw new ContentError("Email cant be a blankSpace")
    if (!emailRegex.test(email)) throw new Error('Invalid email format')
}
function validateId(id) {
    if (typeof id !== "string") throw new TypeError("id is not a string");
    if (!id.trim()) throw new ContentError("id is empty");
}
function validateUsername(userName) {
    if (!userName) throw new ContentError("Username is empty");
    if (typeof userName !== "string") throw new TypeError("Username is not a string");
    if (userName === " ") throw new ContentError("Username cant be a blankSpace")
}

function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/

    if (!password) throw new ContentError("Password is empty")
    if (typeof password !== "string") throw new TypeError("Password is not a string");
    if (password === " ") throw new ContentError("Password cant be a blankSpace")
    if (password.trim().length < 4) throw new ContentError("Password is shorter than 4 characters");
    if (!passwordRegex.test(password)) throw new Error(`password format incorrect`)
}
function validatePasswordsChanges(password, newPassword, newPasswordConfirm) {
    if (!password.trim()) throw new Error("Password is empty")
    if (!newPassword.trim()) throw new Error("New password is empty")
    if (!newPasswordConfirm.trim()) throw new Error("New password confirmation is empty")
}

function validateUrl(url) {
    const avatarRegex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i
    if (typeof url !== "string") throw new TypeError("url is not a string");
    if (url === " ") throw new ContentError("url cant be a blankSpace");
    if (!url.trim()) throw new ContentError("url is empty");
    if (!avatarRegex.test(url)) throw new Error('Image format invalid');
}

function validateText(text) {
    if (typeof text !== "string") throw new TypeError("text is not a string");
    if (!text.trim()) throw new ContentError("text is empty");
}

function validateToken(token) {
    if (typeof token !== "string") throw new TypeError("token is not a string")
    if (token.split(".").length !== 3) throw new ContentError("provided token has no token's format")
}


module.exports = {
    validateEmail, 
    validateId, 
    validateUsername, 
    validatePassword, 
    validatePasswordsChanges, 
    validateUrl, 
    validateText, 
    validateToken 
}

