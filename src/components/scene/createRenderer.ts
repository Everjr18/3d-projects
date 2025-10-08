import * as THREE from 'three'

const createRenderer = () => {
    const sidebarWidth = window.innerWidth > 768 ? 400 : 0
    const w = window.innerWidth - sidebarWidth
    const h = window.innerHeight
    const renderer = new THREE.WebGLRenderer({antialias: true})
    renderer.setSize(w, h)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace
    return renderer
}

export default createRenderer