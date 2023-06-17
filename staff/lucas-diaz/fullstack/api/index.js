require("dotenv").config()
const express = require("express")
const { registerUser, authenticateUser, retrieveUser, updateUserAvatar, updateUserPassword, createPost, retrievePosts, retrieveSavedPosts, retrievePostByPostId, retrieveUserPosts, toggleHidePost, toggleLikePost, toggleSavePostInUser, updatePost, deletePost } = require("./logic")

const api = express()

// esto es un middleware que pasará primero para cada peticion api.get/post/etc
api.use((req, res, next) => {
    //Estas 2 de abajo son cabeceras (headers)
    res.setHeader("Access-Control-Allow-Origin", "*") //acepta llamadas de cualquier ruta
    res.setHeader("Access-Control-Allow-Headers", "*") //permite cualquier tipo de header
    res.setHeader("Access-Control-Allow-Methods", "*") //nos permite acceder a todos los metodos que no sean get y post (patch)
    //sirve para avisar que aqui hemos terminado, que continue con la peticion corresp
    next()
})



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

                res.status(204).send()
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
        try {
            const { email, password } = JSON.parse(json)
            authenticateUser(email, password, (error, userId) => {
                if (error) {
                    res.status(404).json({ error: error.message })
                    return
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
    try {
        const { userId } = req.params

        retrieveUser(userId, (error, user) => {
            if (error) {
                res.status(400).json({ error: error.message })
                return
            }

            res.status(200).json(user)
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

//!updateUserAvatar
api.patch("/users/avatar/:userId", (req, res) => {
    let json = "";


    req.on("data", chunk => {
        json += chunk
    })

    req.on("end", () => {
        try {
            const { userId } = req.params
            const avatar = JSON.parse(json)

            updateUserAvatar(userId, avatar, error => {
                if (error) {
                    res.status(404).json({ error: error.message })
                    return
                }
                res.status(204).send()
            })

        } catch (error) {
            res.status(404).json({ error: error.message })
        }
    })
})

//!updateUserPassword
api.patch("/users/password/:userId", (req, res) => {
    let json = "";

    req.on("data", chunk => {
        json += chunk
    })

    req.on("end", () => {
        debugger;
        try {
            const { userId } = req.params

            const { password, newPassword, newPasswordConfirmation } = JSON.parse(json)

            updateUserPassword(userId, password, newPassword, newPasswordConfirmation, error => {
                if (error) {
                    res.status(404).json({ error: error.message })
                    return
                }
                res.status(204).send()
            })

        } catch (error) {
            res.status(404).json({ error: error.message })
        }
    })
})
//---------------------------------------------------------
//! createPost
api.post("/posts", (req, res) => {
    let json = ""

    req.on("data", chunk => {
        json += chunk
    })

    req.on("end", () => {
        try {
            const { userId, image, text } = JSON.parse(json)


            createPost(userId, image, text, error => {
                if (error) {
                    res.status(400).json({ error: error.message })
                    return
                }

                res.status(204).send()
            })

        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    })
})

//! retrievePosts
api.get("/posts/:userId", (req, res) => {
    try {
        const { userId } = req.params

        retrievePosts(userId, (error, posts) => {
            if (error) {
                res.status(400).json({ error: error.message })
                return
            }

            res.status(200).json(posts)
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

//! retrieveSavedPosts
api.get("/posts/saved/:userId", (req, res) => {
    try {
        const { userId } = req.params

        retrieveSavedPosts(userId, (error, savedPosts) => {
            if (error) {
                res.status(400).json({ error: error.message })
                return
            }

            res.status(200).json(savedPosts)
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

//! retrieveUserPosts
api.get("/posts/users/:userId", (req, res) => {
    try {
        const { userId } = req.params

        retrieveUserPosts(userId, (error, posts) => {
            if (error) {
                res.status(400).json({ error: error.message })
                return
            }

            res.status(200).json(posts)
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

//! retrievePostByPostId
api.get("/posts/:userId/:postId", (req, res) => {
    try {
        const { userId, postId } = req.params

        retrievePostByPostId(userId, postId, (error, post) => {
            if (error) {
                res.status(400).json({ error: error.message })
                return
            }

            res.status(200).json(post)
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

//! toggleHidePost
api.patch("/posts/hide/:userId/:postId", (req, res) => {
    try {
        const { userId, postId } = req.params

        toggleHidePost(userId, postId, error => {
            if (error) {
                res.status(404).json({ error: error.message })
                return
            }
            res.status(204).send()
        })

    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})

//! toggleLikePost
api.patch("/posts/like/:userId/:postId", (req, res) => {
    try {
        const { userId, postId } = req.params

        toggleLikePost(userId, postId, error => {
            if (error) {
                res.status(404).json({ error: error.message })
            }
            res.status(204).send()
        })

    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})

//! toggleSavePostInUser
api.patch("/users/save/:userId/:postId", (req, res) => {
    try {
        const { userId, postId } = req.params

        toggleSavePostInUser(userId, postId, error => {
            if (error) {
                res.status(404).json({ error: error.message })
                return
            }
            res.status(204).send()
        })

    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})

//! updatePost
api.patch("/posts/update/:userId/:postId", (req, res) => {
    let json = "";

    req.on("data", chunk => {
        json += chunk
    })

    req.on("end", () => {
        try {
            const { userId, postId } = req.params
            const { image, text } = JSON.parse(json)

            updatePost(userId, postId, image, text, error => {
                if (error) {
                    res.status(404).json({ error: error.message })
                    return
                }
                res.status(204).send()
            })

        } catch (error) {
            res.status(404).json({ error: error.message })
        }
    })
})

//! deletePost 
api.delete("/posts/delete/:userId/:postId", (req, res) => {
    try {
        const { userId, postId } = req.params


        deletePost(userId, postId, error => {
            if (error) {
                res.status(404).json({ error: error.message })
                return
            }
            res.status(204).send()
        })

    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})


api.listen(process.env.PORT, () => console.log(`Process running in port ${process.env.PORT}`))


