//API2のインデックス
require("dotenv").config()
const io = require("socket.io")(server, {
    cors: {origin: "*"}
})

const server = http.createServer()

io.on("connection", socket => {
    console.log("Se ha contectado un cliente")

    //...
})


server.listen(PROCESS.ENV.PORT)