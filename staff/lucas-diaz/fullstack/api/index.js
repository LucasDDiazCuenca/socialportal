const express = require("express")
const { registerUser, authenticateUser, retrieveUser, updateUserAvatar, updateUserPassword } = require("./logic")

const api = express()

api.get("/", (req, res) => {
    res.send("Hello, World!")
})
api.get("/helloworld", (req, res) => res.json({ hello: "world" }))

//!registerUSer
//Ese users solo hace referencia a users.json, lo que lo obvia! 
// Esta no devuelve nada, devuelve un body vacio 
api.post("/users", (req, res) => {
    let json = ""

    req.on("data", chunk => {
        json += chunk
    })

    req.on("end", () => {
        try {
            const { name, email, password } = JSON.parse(json)


            registerUser(name, email, password, error => {
                if (error) {
                    res.status(400).json({ error: error.message })
                    return
                }

                res.status(201).send()
            })

        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    })
})

//!authenticateUser
api.post("/users/auth", (req, res) => {
    let json = "";

    req.on("data", chunk => {
        json += chunk
    })

    req.on("end", () => {
        debugger;

        try {
            const { email, password } = JSON.parse(json)
            authenticateUser(email, password, (error, userId) => {
                if (error) {
                    res.status(404).json({ error: error.message })
                }
                res.status(202).json({ userId })
            })

        } catch (error) {
            res.status(404).json({ error: error.message })
        }
    })
})

//!retrieveUser
api.get("/users/:userId", (req, res) => {
    //TODO call retrieveUser and return user (in json)
    debugger;
    try {
        const { userId } = req.params

        retrieveUser(userId, (error, user) => {
            if(error){
                res.status(400).json({error: error.message})
                return
            }

            res.status(200).json(user)
        })
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

//!updateUserAvatar
api.post("/users/avatar", (req, res) => {
    let json = "";

    req.on("data", chunk => {
        json += chunk
    })

    req.on("end", () => {
        try {
            const { userId, avatar } = JSON.parse(json)
            updateUserAvatar(userId, avatar, error => {
                if (error) {
                    res.status(404).json({ error: error.message })
                }
                res.status(201).send()
            })

        } catch (error) {
            res.status(404).json({ error: error.message })
        }
    })
})

//!updateUserPassword
api.post("/users/password", (req, res) => {
    let json = "";

    req.on("data", chunk => {
        json += chunk
    })

    req.on("end", () => {
        try {
            const { userId, password, newPassword, newPasswordConfirmation } = JSON.parse(json)
            updateUserPassword(userId, password, newPassword, newPasswordConfirmation, error => {
                if (error) {
                    res.status(404).json({ error: error.message })
                }
                res.status(201).send()
            })

        } catch (error) {
            res.status(404).json({ error: error.message })
        }
    })
})





api.listen(4000)


