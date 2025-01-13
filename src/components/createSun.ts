import * as THREE from 'three'
import { getSunMaterial } from '../shaders/getSunMaterial'
import createSphere from "./createSphere/createSphere.ts";

const createSun = (scene: THREE.Scene) => {

  const material = getSunMaterial({
    coreColor: 0xffff00,
    rimColor: 0xffaa00,
    textureUrl: 'public/img/sun.jpg',
  })

  return createSphere({ scene, material, name: "sunMesh", position: new THREE.Vector3(-50, 0, 3), scale: 5});
}

export default createSun
