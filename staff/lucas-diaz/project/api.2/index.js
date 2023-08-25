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
    //!emitir conexion hacia front 
    console.log("User connected")

    socket.on("newAvatar", (newAvatarData) => {
        // Envía los datos del nuevo avatar al cliente
        socket.emit.emit("addAvatar", newAvatarData);
    })

    //!recibe avatar desde front y lo pushea, si existe no lo pushea
    socket.on("add_avatar", data => {

        const isAvatarRepeated = characters.some(avatar => avatar._id === data._id)

        if (!isAvatarRepeated) {
            characters.push(data)
        }

        console.log(characters.length)

        //! funcion enviar  --> una funcion que envie a front el array de characters 
        io.emit("send_characters", characters)
    })


    socket.on("disconnect", () => {
        console.log("User disconnected")

    })
})

