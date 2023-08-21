import { useKeyboardControls } from "@react-three/drei"


export default function animateCharacter(animationStates, forward, backward, leftward, rightward, actions, text) {
    const [subscribeKeys, getKeys] = useKeyboardControls()
    const { forward, backward, leftward, rightward } = getKeys()
    const walk = actions["walk"]
    const idle = actions["idle"]
    const talk = actions["talk"]

    if (forward || backward || leftward || rightward) {
        if (animationStates.idle) {
            idle.fadeOut(0.5) // Detiene la animación "idle"
            talk.fadeOut(0.5)
            walk.reset().fadeIn(0.3).play(); // Inicia la animación "walk"
            animationStates.idle = false
            animationStates.walk = true
            animationStates.talk = false
        }
    } else {
        if (animationStates.walk) {
            walk.fadeOut(0.8); // Detiene la animación "walk"
            talk.fadeOut(0.5)
            idle.reset().fadeIn(0.5).play(); // Vuelve a la animación "idle"
            animationStates.idle = true
            animationStates.walk = false
            animationStates.talk = false
        }
    }

    if (text) {
        if (animationStates.idle || animationStates.walk) {
            idle.fadeOut(0.5) // Detiene la animación "idle"
            walk.fadeOut(0.5) // Detiene la animación "walk"
            talk.reset().fadeIn(0.5).play()
            animationStates.idle = false
            animationStates.walk = false
            animationStates.talk = true
        }
    }

    //meter las custom emotions here 
}