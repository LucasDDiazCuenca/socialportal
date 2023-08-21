//API2のインデックス
require("dotenv").config()
const { Server } = require("socket.io")

const io = new Server({
    cors: {
        origin: "http://localhost:5173"
    },
})

io.listen(process.env.PORT)

const characters = []


io.on("connection", (socket) => {
//emitir conexion hacia front 
    console.log("User connected")

    
    characters.push({
        id: socket.id,
        position: [2, -1.30, 2]
    })

    socket.emit("hello")

    io.emit("characters", characters)

    socket.on("disconnect", () => {
        console.log("User disconnected")
        characters.splice(
            characters.findIndex(character => character.id === socket.id),1
        );
        io.emit("characters", characters)
    })
})

