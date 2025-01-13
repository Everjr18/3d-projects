import * as THREE from 'three'

const createCamera = () => {
  const w = window.innerWidth
  const h = window.innerHeight
  const fov = 75
  const aspect = w / h
  const near = 0.1
  const far = 1000

  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  camera.position.z = 7
  return camera
}

export default createCamera
