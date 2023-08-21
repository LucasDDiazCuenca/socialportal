import React, { useRef, useEffect } from "react"
import { useGLTF, useAnimations, useKeyboardControls, Text, Html } from "@react-three/drei"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"
import animateCharacter from "../../../logic/character/animateCharacter"
import moveCharacter from "../../../logic/character/moveCharacter"
import customizeCharacter from "../../../logic/character/customizeCharacter"

export default function CustomBoyExperience(props) {
    const group = useRef()
    const { nodes, materials, animations } = useGLTF("models/boy.glb")
    const [subscribeKeys, getKeys] = useKeyboardControls()
    const { actions, mixer } = useAnimations(animations, group)
    const avatar = props.avatar
    const rigidBody = props.rigidBody
    const animationStates = {
        idle: true,
        walk: false,
        talk: false, 
    };
    const text = props.messageToSend

    customizeCharacter(materials, avatar)

    if (rigidBody) {
        useFrame((state, delta) => {
            const { forward, backward, leftward, rightward } = getKeys()
            const walk = actions["walk"]
            const idle = actions["idle"]
            const talk = actions["talk"]

            animateCharacter( forward, backward, leftward, rightward , animationStates, walk, idle, talk, text)
            moveCharacter(forward, backward, leftward, rightward, group, rigidBody, delta, avatar)

            //CAMARA --> posicion del rigidBody 
            const bodyPosition = rigidBody.current.translation()
        })
    }

    useEffect(() => {
        const idleAction = actions["idle"];
        const walkAction = actions["walk"];

        idleAction.reset().fadeIn(0.5).play();

        animationStates.idle = true;
        animationStates.walk = false;

        return () => {
            idleAction.fadeOut(0.5)
            walkAction.fadeOut(0.5)
        }
    }, [mixer]);

    return <>
        <group ref={group} {...props} dispose={null}>
            { text && <Html 
                as="div"
                center
                position-y={4.3}
                sprite
                occlude
                className="text-white bg-cyan-900 p-2 px-5 rounded-3xl w-36 text-center"
            >{text}</Html>}
            <Text position-y={3.6} position-x={-0.2} fontSize={0.2} rotation-y={Math.PI * 0.15}>{avatar.name}</Text>
            <group name="Scene">
                <group
                    name="Armature"
                    position={[-0.168, 0, 0]}
                    rotation={[Math.PI / 2, 0, 0]}
                    scale={0.01}
                >
                    <group name="Character_Merge001">
                        <skinnedMesh
                            castShadow
                            name="Roundcube001"
                            geometry={nodes.Roundcube001.geometry}
                            material={materials.Black}
                            skeleton={nodes.Roundcube001.skeleton}
                        />
                        <skinnedMesh
                            castShadow
                            name="Roundcube001_1"
                            geometry={nodes.Roundcube001_1.geometry}
                            material={materials["Body Skin"]}
                            skeleton={nodes.Roundcube001_1.skeleton}
                        />
                        <skinnedMesh
                            castShadow
                            name="Roundcube001_2"
                            geometry={nodes.Roundcube001_2.geometry}
                            material={materials["Hair 2"]}
                            skeleton={nodes.Roundcube001_2.skeleton}
                        />
                        <skinnedMesh
                            castShadow
                            name="Roundcube001_3"
                            geometry={nodes.Roundcube001_3.geometry}
                            material={materials["Hair 1"]}
                            skeleton={nodes.Roundcube001_3.skeleton}
                        />
                        <skinnedMesh
                            castShadow
                            name="Roundcube001_4"
                            geometry={nodes.Roundcube001_4.geometry}
                            material={materials["Shirt 2"]}
                            skeleton={nodes.Roundcube001_4.skeleton}
                        />
                        <skinnedMesh
                            castShadow
                            name="Roundcube001_5"
                            geometry={nodes.Roundcube001_5.geometry}
                            material={materials.Pants}
                            skeleton={nodes.Roundcube001_5.skeleton}
                        />
                        <skinnedMesh
                            castShadow
                            name="Roundcube001_6"
                            geometry={nodes.Roundcube001_6.geometry}
                            material={materials["Shores.002"]}
                            skeleton={nodes.Roundcube001_6.skeleton}
                        />
                        <skinnedMesh
                            castShadow
                            name="Roundcube001_7"
                            geometry={nodes.Roundcube001_7.geometry}
                            material={materials["Shores Edge"]}
                            skeleton={nodes.Roundcube001_7.skeleton}
                        />
                    </group>
                    <primitive object={nodes.mixamorigHips} />
                </group>
            </group>
        </group>
    </>

}

useGLTF.preload("models/boy.glb");
