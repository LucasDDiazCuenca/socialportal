import { useEffect, useState } from "react"
import { io } from "socket.io-client"

export const socket = io(`${import.meta.env.VITE_API2_URL}`)

export const SocketManager = () => {
    const [isConnected, setIsConnected] = useState(false)

    useEffect(() => {
        console.log(isConnected)

        function onConnect() {
            console.log("connected")
            setIsConnected(true)
            console.log(isConnected)
        }
        function onDisconnect() {
            console.log("disconnect")
        }
        function onHello() {
            console.log("hello")
        }
        function onCharacters(value){
            console.log(value)
        }

        socket.on("connect", onConnect) //subscribirse a event connection de back
        socket.on("hello", onHello)  //subscribirse a event hello de back
        socket.on("characters", onCharacters) //subscribirse a event characters de back
        socket.on("disconnect", onDisconnect) //subscribirse a event disconnect de back

    }, [])

}