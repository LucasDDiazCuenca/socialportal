const { readFile, writeFile } = require("fs") //Commons js 



module.exports =  function registerUser(name, email, password, callback) {
    // TODO validate imputs

                              // formato //callback
    readFile("./data/users.json", "utf8", (error, json) => {
        if (error) {
            callback(error)
            return
        }

        const users = JSON.parse(json)
        let user = users.find(user => user.email === email)

        if (user) {
            callback(new Error(`User with email ${email} already exist`))
            return
        }

        let id = "user-1"
        const lastUser = users.at(-1)

        if (lastUser)
            id = "user-" + (parseInt(lastUser.id.slice(5)) + 1)

        user = {
            id,
            name: name,
            email: email,
            password: password,
            avatar: "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png",
            savedPosts: [] 
        } 
        users.push(user)

        json = JSON.stringify(users)

        writeFile("./data/users.json", json ,"utf8", error => {
            if (error){
                callback(error)
                return
            }
            callback(null)
        })
    })
}