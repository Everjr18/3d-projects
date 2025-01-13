import * as THREE from 'three'

const createLights = (scene: THREE.Scene) => {
    const sunLight = new THREE.DirectionalLight(0xffffff, 2.0)
    sunLight.position.set(-2, 0.5, 1.5)
    scene.add(sunLight)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
    ambientLight.position.set(0, 1, 0)
    scene.add(ambientLight)
}

export default createLights