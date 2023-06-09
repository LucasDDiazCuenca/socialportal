const { readFile, writeFile } = require("fs")

module.exports = function updateUserPassword(userId, password, newPassword, newPasswordConfirmation, callback) {
    // TODO validate imputs 

    readFile("./data/users.json", "utf8", (error, json) => {
        if (error) {
            callback(error)
            return
        }

        const users = JSON.parse(json)
        let foundUser = users.find(user => user.id === userId)

        if (!foundUser) {
            callback(new Error("user not found"))
            return
        }

        if (foundUser.password !== password) {
            callback(new Error("typed password isn't actual password user's value"))
            return
        }
        if (password === newPassword) {
            callback(new Error("Password is equal than new password"))
            return
        }

        if (newPassword !== newPasswordConfirmation) {
            callback(new Error("New password and new password confirmation are not the same"))
            return
        }

        foundUser.password = newPassword;
        json = JSON.stringify(users, null, 4)

        writeFile("./data/users.json", json, "utf8", error => {
            if (error) {
                callback(error)
                return
            }
            callback(null)
        })
    })
}