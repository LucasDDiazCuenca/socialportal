require("dotenv").config()
const { validators: { validateId } } = require("com")
const context = require("../context")
const { ObjectId } = require("mongodb")

module.exports = function retrieveUser(userId) {
    validateId(userId)

    const { users } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new Error("user not found")

            //sanitaze
            delete user._id
            delete user.password
            delete user.email

            return user
        })

    // //leer archivo 
    // readFile(`${process.env.DB_PATH}/users.json`,  (error, json) => {
    //     if (error) {
    //         callback(error)
    //         return
    //     }
    //     const users = JSON.parse(json)
    //     //buscar user 
    //     const user = users.find(user => user.id === userId)

    //     if (!user) {
    //         callback(new Error("User not found"))
    //         return
    //     }

    //     const _user = {
    //         name: user.name,
    //         avatar: user.avatar,
    //         savedPosts: user.savedPosts
    //     }
    //     //guardar y devolverlo en la callback 
    //     callback(null, _user)
    // })
}