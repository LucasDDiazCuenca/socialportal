const express = require("express")

const api = express()

api.get("/", (req, res) => {
    debugger
    res.send("Hello, World!")
})
api.get("/helloworld", (req, res) => res.json({hello: "world"}))

api.listen(4000)


