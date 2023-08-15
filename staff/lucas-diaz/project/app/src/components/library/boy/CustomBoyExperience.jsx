import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations, useKeyboardControls } from "@react-three/drei";
import * as THREE from "three"
import { useFrame } from "@react-three/fiber";

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
    };

    materials["Hair 2"].color = new THREE.Color(avatar.hair)
    materials["Hair 1"].color = new THREE.Color(avatar.hair)
    materials["Body Skin"].color = new THREE.Color(avatar.skin)
    materials["Shirt 2"].color = new THREE.Color(avatar.shirt)
    materials.Pants.color = new THREE.Color(avatar.trousers)
    materials["Shores.002"].color = new THREE.Color(avatar.shoes)

    if (rigidBody) {
        useFrame((state, delta) => {
            const { forward, backward, leftward, rightward } = getKeys()
            const impulse = { x: 0, y: 0, z: 0 }
            const impulseStrength = 0.00000115 * delta * 10
            const walk = actions["walk"];
            const idle = actions["idle"];

            if (forward || backward || leftward || rightward) {
                if (animationStates.idle) {
                    idle.fadeOut(0.5) // Detiene la animación "idle"
                    walk.reset().fadeIn(0.3).play(); // Inicia la animación "walk"
                    animationStates.idle = false;
                    animationStates.walk = true;
                }
            } else {
                if (animationStates.walk) {
                    walk.fadeOut(0.8); // Detiene la animación "walk"
                    idle.reset().fadeIn(0.5).play(); // Vuelve a la animación "idle"
                    animationStates.idle = true;
                    animationStates.walk = false;
                }
            }

            if (forward) {
                impulse.z -= impulseStrength
            }
            if (backward) {
                impulse.z += impulseStrength
            }
            if (leftward) {
                impulse.x -= impulseStrength
            }
            if (rightward) {
                impulse.x += impulseStrength
            }

            // Calcula el vector de movimiento basado en el impulso
            const movementDirection = new THREE.Vector3(impulse.x, 0, impulse.z).normalize();

            // Calcula la rotación necesaria para mirar en la dirección de movimiento
            const targetQuaternion = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, Math.atan2(movementDirection.x, movementDirection.z), 0));

            // Interpola suavemente hacia la nueva rotación
            const lerpFactor = 0.12; // Puedes ajustar este valor para controlar la suavidad
            group.current.quaternion.slerp(targetQuaternion, lerpFactor);

            rigidBody.current.applyImpulse(impulse)

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

    return (
        <group ref={group} {...props} dispose={null}>
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
    );
}

useGLTF.preload("models/boy.glb");
