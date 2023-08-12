import { Canvas } from '@react-three/fiber'
import VioletRoomExperience from '../components/VioletRoomExperience'
import { useControls } from 'leva'

export default function World() {

    // const {color } = useControls({
    //     color: "#fabada"
    // })

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
            <VioletRoomExperience />
        </Canvas>
    </div>
}