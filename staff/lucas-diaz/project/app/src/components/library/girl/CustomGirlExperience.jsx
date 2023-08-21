import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations, useKeyboardControls, Text, Html } from "@react-three/drei";
import * as THREE from "three"
import { act, useFrame } from "@react-three/fiber"
import animateCharacter from "../../../logic/character/animateCharacter"
import moveCharacter from "../../../logic/character/moveCharacter"
import customizeCharacter from "../../../logic/character/customizeCharacter"

export default function CustomGirlExperience(props) {
    const group = useRef();
    const { nodes, materials, animations } = useGLTF("./models/girl.glb");
    const [subscribeKeys, getKeys] = useKeyboardControls()
    const { actions, mixer } = useAnimations(animations, group);
    const avatar = props.avatar
    const rigidBody = props.rigidBody
    const animationStates = {
        idle: true,
        walk: false,
        talk: false,
    }
    const text = props.messageToSend

    console.log(avatar)

    customizeCharacter(materials, avatar)

    if (rigidBody) {
        useFrame((state, delta) => {
            const { forward, backward, leftward, rightward } = getKeys()

            const walk = actions["walk"]
            const idle = actions["idle"]
            const talk = actions["talk"]

            animateCharacter(forward, backward, leftward, rightward, animationStates, walk, idle, talk, text)
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
            {text && <Html
                as="div"
                center
                position-y={4.3}
                sprite
                occlude
                className="text-white bg-violet-800 p-2 px-5 rounded-3xl w-36 text-center"
            >{text}</Html>}

            <group background={new THREE.Color("#000000")}>
                <Text position-y={4} fontSize={0.2}>{avatar.name}</Text>
            </group>
            <group name="Scene">
                <group
                    name="Armature"
                    position={[0.026, 0, 0]}
                    rotation={[Math.PI / 2, 0, -0.059]}
                    scale={0.01}
                >

                    <group name="Torus001">
                        <skinnedMesh
                            castShadow
                            name="Torus001_1"
                            geometry={nodes.Torus001_1.geometry}
                            material={materials.pantalones}
                            skeleton={nodes.Torus001_1.skeleton}
                        />
                        <skinnedMesh
                            castShadow
                            name="Torus001_2"
                            geometry={nodes.Torus001_2.geometry}
                            material={materials.рот}
                            skeleton={nodes.Torus001_2.skeleton}
                        />
                        <skinnedMesh
                            castShadow
                            name="Torus001_3"
                            geometry={nodes.Torus001_3.geometry}
                            material={materials.тело}
                            skeleton={nodes.Torus001_3.skeleton}
                        />
                        <skinnedMesh
                            castShadow
                            name="Torus001_4"
                            geometry={nodes.Torus001_4.geometry}
                            material={materials.БРОВ}
                            skeleton={nodes.Torus001_4.skeleton}
                        />
                        <skinnedMesh
                            castShadow
                            name="Torus001_5"
                            geometry={nodes.Torus001_5.geometry}
                            material={materials.глаза}
                            skeleton={nodes.Torus001_5.skeleton}
                        />
                        <skinnedMesh
                            castShadow
                            name="Torus001_6"
                            geometry={nodes.Torus001_6.geometry}
                            material={materials.camisa}
                            skeleton={nodes.Torus001_6.skeleton}
                        />
                        <skinnedMesh
                            castShadow
                            name="Torus001_7"
                            geometry={nodes.Torus001_7.geometry}
                            material={materials.pelo}
                            skeleton={nodes.Torus001_7.skeleton}
                        />
                    </group>
                    <primitive object={nodes.mixamorigHips} />
                </group>
            </group>
        </group>
    </>
}

useGLTF.preload("./models/girl.glb");
