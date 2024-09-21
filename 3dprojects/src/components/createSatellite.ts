import * as THREE from 'three'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js'

const createSatellite = (scene: THREE.Scene) => {
  const objLoader = new OBJLoader()
  const mtlLoader = new MTLLoader()
  mtlLoader.load('Satelite.mtl', (mtl) => {
    mtl.preload()
    for (const material of Object.values(mtl.materials)) {
      material.side = THREE.DoubleSide
    }
    objLoader.setMaterials(mtl)
    objLoader.load('/Satelite.obj', (root) => {
      root.translateY(1)
      root.translateX(1)
      root.translateZ(1)
      root.scale.set(0.05, 0.05, 0.05)
      root.rotation.x = Math.PI / 4
      root.name = 'satelite'
      scene.add(root)
    })
  })
}

export default createSatellite
