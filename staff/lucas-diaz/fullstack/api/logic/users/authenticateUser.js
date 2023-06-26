require("dotenv").config()
const {validators: {validateEmail, validatePassword} } = require("com")
const context = require("../context")

module.exports = function authenticateUser(email, password){
    validateEmail(email)
    validatePassword(password)


    const {users} = context

    return users.findOne({email})
        .then(user => {
            if (!user) throw new Error(`there is no user with email: ${email}`)

            if (user.password !== password) throw new Error("wrong credentials")

            return user._id.toString()
        })

    // readFile(`${process.env.DB_PATH}/users.json`,  (error, json) => {
    //     if (error){
    //         callback(error)
    //         return;
    //     }

    //     const users = JSON.parse(json)

    //     const user = users.find(user => user.email === email)

    //     if (!user){
    //         callback(new Error(`there is no user with email: ${email}`))
    //         return
    //     }
    //     if (user.password !== password){
    //         callback(new Error(`wrong credentials`))
    //         return
    //     }

    //     callback(null, user.id)
    // })

}


