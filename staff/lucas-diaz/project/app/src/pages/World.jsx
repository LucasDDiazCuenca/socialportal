import { Canvas } from '@react-three/fiber'
import VioletRoomExperience from '../components/VioletRoomExperience'
import { Suspense, useEffect, useState } from 'react'
import retrieveAvatar from "../logic/retrieveAvatar"
import { Loader, KeyboardControls } from "@react-three/drei"

export default function World() {
    const [avatar, setAvatar] = useState()

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

    return <div className=" w-screen h-screen bg-white">
        <KeyboardControls map={[
            {name: "forward", keys:["ArrowUp", "KeyW"]},
            {name: "backward", keys:["ArrowDown", "KeyS"]},
            {name: "leftward", keys:["ArrowLeft", "KeyA"]},
            {name: "rightward", keys:["ArrowRight", "KeyD"]},
            {name: "jump", keys:["Space"]},

        ]}>
            <Loader
                initialState={(active) => active} // Initial black out state
            />
            <Canvas
                shadows
                orthographic
                camera={{
                    //fov: 80,   //aleja un poco la camara, 80 es por defect, no funciona en ortho
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
}