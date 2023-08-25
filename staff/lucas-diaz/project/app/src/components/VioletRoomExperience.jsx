import * as THREE from "three"
import React, { useRef, useState } from "react"
import { OrbitControls, useGLTF } from "@react-three/drei"
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier"
import ArcadeExperience from "./library/ArcadeExperience"
import CustomBoyExperience from "./library/boy/CustomBoyExperience"
import CustomGirlExperience from "./library/girl/CustomGirlExperience"
import VioletRoomFurniture from "./VioletRoomFurniture"
import { useAppContext } from "../hooks"


export default function VioletRoomExperience({ avatar, messageToSend, emotionToSend }) {
    const { nodes, materials } = useGLTF("./models/violetRoom.glb")
    materials["Material.014"].color = new THREE.Color("#83deb5")
    const boy = "./models/boy.glb"
    const girl = "./models/girl.glb"
    const modelRigidBody = useRef()
    let { avatars } = useAppContext()

    console.log(avatars)

    return <Physics>
        <group dispose={null}>
            <OrbitControls
                maxAzimuthAngle={Math.PI / 4}
                minPolarAngle={0}
                maxPolarAngle={Math.PI / 2}
                minDistance={2}
            />

            <pointLight color="#d2cbdb" intensity={0.42} position={[-0.42, 0.8, -1.2]} />
            <pointLight color="#9b7ac1" intensity={0.5} position={[2.95, 0.8, -1.2]} />
            <directionalLight
                castShadow
                position={[5, 2, 3]}
                intensity={0.50}
                shadow-normalBias={0.04}
                shadow-mapSize={[2048, 2048]}
                shadow-camera-top={10}
                shadow-camera-right={10}
                shadow-camera-bottom={-10}
                shadow-camera-left={-10}
                shadow-camera-near={1}
                shadow-camera-far={10}
            />
            <ambientLight intensity={0.22} />

            {avatars.map((avatar) => (
                <RigidBody
                    key={avatar._id}
                    ref={modelRigidBody}
                    type="dinamic"
                    canSleep={false}
                    colliders="cuboid"
                    friction={1}
                    linearDamping={1}
                >
                    {avatar?.model === "./models/boy.glb" && (
                        <CustomBoyExperience
                            avatar={avatar}
                            scale={0.6}
                            position={[2, -1.30, 2]}
                            rigidBody={modelRigidBody}
                            messageToSend={messageToSend}
                            emotionToSend={emotionToSend}
                        />
                    )}

                    {avatar?.model === "./models/girl.glb" && (
                        <CustomGirlExperience
                            avatar={avatar}
                            scale={0.515}
                            rigidBody={modelRigidBody}
                            messageToSend={messageToSend}
                            emotionToSend={emotionToSend}
                        />
                    )}
                </RigidBody>
            ))}

            <RigidBody type="dinamic" colliders={false} position={[-1.3, -1.35, 4.0]} rotation-y={Math.PI * 0.5}>
                <CuboidCollider args={[0.5, 1, 0.5]} position={[0.4, 1, 0.45]} />
                <ArcadeExperience scale={0.01} />
            </RigidBody>

            <VioletRoomFurniture nodes={nodes} materials={materials} />
        </group>
    </Physics>
}

useGLTF.preload("./models/violetRoom.glb");
