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
    const [emotionsVisibility, setEmotionsVisibility] = useState(false)
    const [emotionToSend, setEmotionToSend] = useState(null)
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
            }, 3000)
        }
    }

    const handleEmotions = () => {
        setEmotionsVisibility(!emotionsVisibility)
    }

    const handleSendEmotion = (animation) => {
        setEmotionToSend(animation)

        setTimeout(() => {
            setEmotionToSend(null)
        }, 10)

        setEmotionsVisibility(!emotionsVisibility)
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
                        <VioletRoomExperience avatar={avatar} messageToSend={messageToSend} emotionToSend={emotionToSend} />
                    </Suspense>
                </Canvas>
            </KeyboardControls>
        </div>
        <div className='fixed top-0 left-0 p-3'>
            <button onClick={handleNavigateHome}>
                <img src="./icons/logoutRedBg.png" alt="log out button" />
            </button>
        </div>
        <div className='fixed bottom-0 right-0 p-3  w-20'>
            <button onClick={handleTalk}>
                <img src="./icons/talk.png" alt="chat button" />
            </button>
        </div>
        <div className='fixed bottom-20 right-0 p-3 w-20'>
            <button onClick={handleEmotions}>
                <img src="./icons/emotions.png" alt="emotions button" />
            </button>
        </div>
        {emotionsVisibility && <div className='flex w-52 gap-x-4 p-2 bg-[#452B8E] rounded-xl fixed bottom-24 right-20'>
            <button>
                <img src={`./icons/emotions/${avatar?.emotions[0]}.png`} alt="emotions button" onClick={() => handleSendEmotion(avatar?.emotions[0])} />
            </button>
            <button>
                <img src={`./icons/emotions/${avatar?.emotions[1]}.png`} alt="emotions button" onClick={() => handleSendEmotion(avatar?.emotions[1])} />
            </button>
            <button>
                <img src={`./icons/emotions/${avatar?.emotions[2]}.png`} alt="emotions button" onClick={() => handleSendEmotion(avatar?.emotions[2])} />
            </button>
        </div>}
        {chatVisibility && <input className='fixed w-6/12 bottom-6 right-20 p-3 rounded-lg bg-purple-200' type="text" onChange={event => setMessage(event.target.value)} onKeyDown={handleSendText} />}
    </>
}