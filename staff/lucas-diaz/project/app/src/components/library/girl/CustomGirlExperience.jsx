import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations, useKeyboardControls, Text } from "@react-three/drei";
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"

export default function CustomGirlExperience(props) {
    const group = useRef();
    const { nodes, materials, animations } = useGLTF("./models/girl.glb");
    const { actions, mixer } = useAnimations(animations, group);
    const [subscribeKeys, getKeys] = useKeyboardControls()
    const avatar = props.avatar
    const rigidBody = props.rigidBody
    const animationStates = {
        idle: true,
        walk: false,
    }

    materials.pelo.color = new THREE.Color(avatar.hair)
    materials.тело.color = new THREE.Color(avatar.skin)
    materials.camisa.color = new THREE.Color(avatar.shirt)
    materials.pantalones.color = new THREE.Color(avatar.trousers)
    materials.глаза.color = new THREE.Color(avatar.shoes)

    if (rigidBody) {
        useFrame((state, delta) => {
            const { forward, backward, leftward, rightward } = getKeys()
            const impulse = { x: 0, y: 0, z: 0 }
            const impulseStrength = 0.0000008 * delta * 10
            const walk = actions["walk"]
            const idle = actions["idle"]

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
            <group background={new THREE.Color("#000000")}>
                <Text position-y={4} fontSize={0.2}>{avatar.author.name}</Text>
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
    );
}

useGLTF.preload("./models/girl.glb");
