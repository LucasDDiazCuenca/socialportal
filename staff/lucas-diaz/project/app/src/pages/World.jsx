import { Canvas } from '@react-three/fiber'
import VioletRoomExperience from '../components/VioletRoomExperience'
import { Suspense, useEffect, useState } from 'react'
import retrieveAvatar from "../logic/retrieveAvatar"
import { Loader, KeyboardControls } from "@react-three/drei"
import { useAppContext } from "../hooks"

export default function World() {
    const [avatar, setAvatar] = useState()
    const { navigate } = useAppContext()

    useEffect(() => {
        try {
            (async () => {
                const _avatar = await retrieveAvatar()
                setAvatar(_avatar)
            })()
        } catch (error) {
            alert(error)
        }
    }, [])

    const handleNavigateHome = () => {
        navigate("/")
    }

    return <>
        <div className=" w-screen h-screen bg-white z-0">
            <KeyboardControls map={[
                { name: "forward", keys: ["ArrowUp", "KeyW"] },
                { name: "backward", keys: ["ArrowDown", "KeyS"] },
                { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
                { name: "rightward", keys: ["ArrowRight", "KeyD"] },
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
                        <VioletRoomExperience avatar={avatar} />
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
            <button onClick={() => console.log("handle talk")}>
                <img src="./icons/talk.png" alt="chat" />
            </button>
        </div>
    </>
}