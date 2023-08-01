import { useAnimations, useGLTF, Sparkles } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useEffect } from "react"

export default function LoginExperience(){
    const male2 = useGLTF("./models/person1/boy1.glb")

    male2.scene.children[0].children[0].children.forEach(mesh => {
        mesh.castShadow = true
    })

    const animations = useAnimations(male2.animations, male2.scene)

    useEffect(() => {
        const action = animations.actions["waving"]
        action.reset().fadeIn(0.5).play()

        return () => {
            action.fadeOut(0.5)
        }
    }, [])

    useFrame((state, delta) => {
        setTimeout(() => {
            if (male2.scene.position.z <= 2) {
                male2.scene.position.z += delta * 2

                const waving = animations.actions["waving"]
                waving.stop()

                const walk = animations.actions["walk"]
                walk.play()

                if (male2.scene.position.z >= 2) {
                    const waving = animations.actions["waving"]
                    walk.fadeOut(0.1)
                    waving.reset().fadeIn(0.1).play()
                }
            }
        }, 2500)
    })

    return <>
        <directionalLight position={[1, 2, 3]} intensity={1.5} castShadow />

        <ambientLight intensity={0.4} />

        <Sparkles
            size={7}
            position={[0,1,1]}
            scale={[2.8, 4, 3]}
            count={100}
            speed={0.4}
            opacity={0.3}
        />

        <mesh position={[0, -1, 0]} rotation-x={-Math.PI * 0.5} scale={[14, 17, 1]} receiveShadow>
            <planeGeometry args={[1, 1]} />
            <meshStandardMaterial args={[{ color: "#452b8e" }]} />
        </mesh>

        <primitive object={male2.scene} scale={1} position={[0.2, -1, -8]} />
    </>
}

useGLTF.preload("./models/person1/boy1.glb")