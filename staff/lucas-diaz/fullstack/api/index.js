require("dotenv").config()
const express = require("express")
const { registerUser, authenticateUser, retrieveUser, updateUserAvatar, updateUserPassword, createPost, retrievePosts, retrieveSavedPosts, retrievePostByPostId, retrieveUserPosts, toggleHidePost, toggleLikePost, toggleSavePostInUser, updatePost, deletePost } = require("./logic")
const { extractUserId } = require("./helpers")

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

//!registerUSer
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
api.get("/users", (req, res) => {
    try {
        const userId = extractUserId(req)

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
api.patch("/users/avatar", (req, res) => {
    let json = "";

    req.on("data", chunk => {
        json += chunk
    })

    req.on("end", () => {
        try {
            const userId = extractUserId(req)
            const { avatar } = JSON.parse(json)

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
api.patch("/users/password", (req, res) => {
    let json = "";

    req.on("data", chunk => {
        json += chunk
    })

    req.on("end", () => {
        try {
            const userId = extractUserId(req)
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
            const userId = extractUserId(req)
            const { image, text } = JSON.parse(json)

            createPost(userId, image, text, error => {
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

//! retrievePosts
api.get("/posts", (req, res) => {
    try {
        const userId = extractUserId(req)

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
api.get("/posts/saved", (req, res) => {
    try {
        const userId = extractUserId(req)

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
api.get("/posts/users", (req, res) => {
    try {
        const userId = extractUserId(req)

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
api.get("/posts/:postId", (req, res) => {
    try {
        const { postId } = req.params
        const userId = extractUserId(req)

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
api.patch("/posts/hide/:postId", (req, res) => {
    try {
        const userId = extractUserId(req)
        const { postId } = req.params

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
api.patch("/posts/like/:postId", (req, res) => {
    try {
        const userId = extractUserId(req)
        const { postId } = req.params

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
api.patch("/users/save/:postId", (req, res) => {
    try {
        const userId = extractUserId(req)
        const { postId } = req.params

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
api.patch("/posts/update/:postId", (req, res) => {
    let json = "";

    req.on("data", chunk => {
        json += chunk
    })

    req.on("end", () => {
        try {
            const userId = extractUserId(req)
            const { postId } = req.params
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
api.delete("/posts/delete/:postId", (req, res) => {
    try {
        const userId = extractUserId(req)
        const { postId } = req.params


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


