import * as THREE from "three"

export default function moveCharacter(forward, backward, leftward, rightward, group, rigidBody, delta) {
    const impulse = { x: 0, y: 0, z: 0 }
    const impulseStrength = 0.00000115 * delta * 10
    
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

}