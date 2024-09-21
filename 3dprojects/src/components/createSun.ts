import * as THREE from 'three'
import { getFresnelMat } from '../getFresnelMat'

const createSun = (scene: THREE.Scene) => {
  const loader = new THREE.TextureLoader()
  const group = new THREE.Group()

  scene.add(group)

  const geometry = new THREE.IcosahedronGeometry(1, 12)
  const material = new THREE.MeshPhongMaterial({
    map: loader.load('/sun.jpg'),
    emissive: new THREE.Color(0xffff00), // Glowing yellow light
    emissiveIntensity: 0.5, // Intensity of the glow
  })
  const mesh = new THREE.Mesh(geometry, material)
  group.add(mesh)
  group.position.set(-2, 0.5, 3)
  group.scale.setScalar(0.4 / 2.7)

  const fresnelMat = getFresnelMat({ rimHex: 0xffaa00, facingHex: 0x000000 })
  const glowMesh = new THREE.Mesh(geometry, fresnelMat)
  glowMesh.scale.setScalar(1)
  group.add(glowMesh)

  return group
}

export default createSun
