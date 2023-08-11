import CustomBoyExperience from "../components/library/CustomBoyExperience"
import CustomGirlExperience from "../components/library/CustomGirlExperience"

export default function HomeBackgroundExperience({ avatar }) {
    const boy = "./models/boy.glb"
    const girl = "./models/girl.glb"

    return <>
        <directionalLight
            position={[1, 2, 3]}
            intensity={1.2}
            shadow-normalBias={0.04}
            shadow-mapSize={[1024, 1024]}
            shadow-camera-top={5}
            shadow-camera-right={5}
            shadow-camera-bottom={-5}
            shadow-camera-left={-5}
            shadow-camera-near={1}
            shadow-camera-far={10}
        />
        <ambientLight intensity={0.5} />
        {avatar.model === boy && <CustomBoyExperience avatar={avatar} position={[0.2, -3, -0.65]}/>}
        {avatar.model === girl && <CustomGirlExperience avatar={avatar} position={[0., -2.5, -1]} scale={0.85}/>}
    </>
}