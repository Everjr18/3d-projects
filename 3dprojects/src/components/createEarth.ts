import * as THREE from 'three'
import { getFresnelMat } from '../shaders/getFresnelMat'

const createEarth = (earthGroup: THREE.Group<THREE.Object3DEventMap>) => {
  const geometry = new THREE.IcosahedronGeometry(1, 12)
  const loader = new THREE.TextureLoader()
  const material = new THREE.MeshPhongMaterial({
    map: loader.load('/earthmap1k.jpg'),
    specularMap: loader.load('/earthspec1k.jpg'),
    bumpMap: loader.load('/earthcloudmaptrans.jpg'),
    bumpScale: 0.04,
  })
  const earthMesh = new THREE.Mesh(geometry, material)
  earthGroup.add(earthMesh)
  const lightsMat = new THREE.MeshBasicMaterial({
    map: loader.load('/earthlights1k.jpg'),
    blending: THREE.AdditiveBlending,
  })
  const lightMesh = new THREE.Mesh(geometry, lightsMat)
  earthGroup.add(lightMesh)
  const cloudsMat = new THREE.MeshStandardMaterial({
    map: loader.load('/earthcloudmap.jpg'),
    blending: THREE.AdditiveBlending,
    alphaMap: loader.load('/earthcloudmaptrans.jpg'),
  })
  const cloudsMesh = new THREE.Mesh(geometry, cloudsMat)
  cloudsMesh.scale.setScalar(1.003)
  earthGroup.add(cloudsMesh)
  const fresnelMat = getFresnelMat({ rimHex: 0x0088ff, facingHex: 0x000000 })
  const glowMesh = new THREE.Mesh(geometry, fresnelMat)
  glowMesh.scale.setScalar(1.01)
  earthGroup.add(glowMesh)

  return {
    earthMesh,
    lightMesh,
    cloudsMesh,
    glowMesh,
  }
}

export default createEarth
