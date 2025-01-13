import * as THREE from 'three'

const createRenderer = () => {
    const w = window.innerWidth
    const h = window.innerHeight
    const renderer = new THREE.WebGLRenderer({antialias: true})
    renderer.setSize(w, h)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace
    return renderer
}

export default createRenderer