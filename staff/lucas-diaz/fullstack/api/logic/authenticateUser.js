const {readFile, read} = require("fs")

module.exports = function authenticateUser(email, password, callback){

    //todo validate fields 

    readFile("./data/users.json", "utf8", (error, json) => {
        if (error){
            callback(error)
            return;
        }

        const users = JSON.parse(json)

        const user = users.find(user => user.email === email)

        if (!user){
            callback(new Error(`there is no user with email: ${email}`))
            return
        }
        if (user.password !== password){
            callback(new Error(`wrong credentials`))
            return
        }

        callback(null, user.id)
    })

}