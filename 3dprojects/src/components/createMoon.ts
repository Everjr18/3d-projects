import * as THREE from 'three'
import createSphere from "./createSphere/createSphere.ts";

const createMoon = (scene: THREE.Scene) => {
  const loader = new THREE.TextureLoader()

  const material = new THREE.MeshPhongMaterial({
    map: loader.load('public/img/moonmap1k.jpg'),
    bumpMap: loader.load('public/img/moonbump1k.jpg'),
    bumpScale: 0.04,
  })

  return createSphere( {scene, material : material, name: "moonMesh", position: new THREE.Vector3(3.5, 0, 3.5), scale: 1/ 2.7})
}

export default createMoon
