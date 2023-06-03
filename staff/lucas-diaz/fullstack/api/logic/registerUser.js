const { readFile } = require("fs") //Commons js 



function registerUser(name, email, password) {
    // TODO validate imputs

    // formato //callba
    readFile("./data/users.json", "utf-8", (error, json) => {
        if (error) {
            callback(error)
            return
        }

        const users = JSON.parse(json)

        let user = users.find(user => user.email === email)

        if (user) {
            callbac(new Error(`User with email ${email} alreadye exists`))
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
    })
}