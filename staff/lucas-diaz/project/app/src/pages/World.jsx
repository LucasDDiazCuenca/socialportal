import { Canvas } from '@react-three/fiber'
import VioletRoomExperience from '../components/VioletRoomExperience'
import { Suspense, useEffect, useState } from 'react'
import retrieveAvatar from "../logic/retrieveAvatar"
import { Loader, KeyboardControls } from "@react-three/drei"
import { useAppContext } from "../hooks"


export default function World() {
    const [avatar, setAvatar] = useState()
    const { navigate } = useAppContext()
    const [chatVisibility, setChatVisibility] = useState(false)
    const [message, setMessage] = useState("")
    const [messageToSend, setMessageToSend] = useState(null)

    useEffect(() => {
        console.log("<World/> mounted")
        try {

            (async () => {
                const _avatar = await retrieveAvatar()
                setAvatar(_avatar)
            })()
        } catch (error) {
            alert(error)
        }

        return () => {
            console.log("<World/> unmounted")
        }
    }, [])

    const handleNavigateHome = () => {
        navigate("/")
    }

    const handleTalk = () => {
        setChatVisibility(!chatVisibility)
    }

    const handleSendText = (event) => {
        if (event.key === "Enter") {
            
            setMessageToSend(message)
            setMessage("")
            setChatVisibility(!chatVisibility)

            setTimeout(() => {
                setMessageToSend(null)
            },3000)
        }
    }

    return <>
        <div className=" w-screen h-screen bg-white z-0">
            <KeyboardControls map={[
                { name: "forward", keys: ["ArrowUp"] },
                { name: "backward", keys: ["ArrowDown"] },
                { name: "leftward", keys: ["ArrowLeft"] },
                { name: "rightward", keys: ["ArrowRight"] },
                { name: "jump", keys: ["Space"] },

            ]}>
                <Loader
                    initialState={(active) => active} // Initial black out state
                />
                <Canvas
                    shadows
                    orthographic
                    camera={{
                        //fov: 80, 
                        zoom: 110,
                        near: 0.1,
                        far: 200,
                        position: [5, 2, 5]
                    }}
                >
                    <color args={["#322734"]} attach={"background"} />
                    <Suspense fallback={null}>
                        <VioletRoomExperience avatar={avatar} messageToSend={messageToSend}/>
                    </Suspense>
                </Canvas>
            </KeyboardControls>
        </div>
        <div className='fixed top-0 left-0 p-3'>
            <button onClick={handleNavigateHome}>
                <img src="./icons/logoutRedBg.png" alt="log out button" />
            </button>
        </div>
        <div className='fixed bottom-0 right-0 p-3'>
            <button onClick={handleTalk}>
                <img src="./icons/talk.png" alt="chat" />
            </button>
        </div>
        {chatVisibility && <input className='fixed w-6/12 bottom-6 right-20 p-3 rounded-lg bg-purple-200' type="text" onChange={event => setMessage(event.target.value)} onKeyDown={handleSendText} />}
    </>
}