import { Canvas } from '@react-three/fiber'
import VioletRoomExperience from '../components/VioletRoomExperience'
import { useEffect, useState } from 'react'
import retrieveAvatar from "../logic/retrieveAvatar"

export default function World() {
    const [avatar, setAvatar] = useState()

    useEffect(() => {
        try {
            (async() =>{
                const _avatar = await retrieveAvatar()
                setAvatar(_avatar)
            } )()
        } catch (error) {
            alert(error)
        }
    }, [])

    return <div className=" w-screen h-screen bg-white">
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
            <color args={["#322734"]} attach={"background"}/>
            <VioletRoomExperience avatar={avatar}/>
        </Canvas>
    </div>
}