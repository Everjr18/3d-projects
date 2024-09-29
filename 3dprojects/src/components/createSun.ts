import * as THREE from 'three'
import { getSunMaterial } from '../shaders/getSunMaterial' // Asegúrate de importar tu shader

const createSun = (scene: THREE.Scene) => {
  const group = new THREE.Group()
  scene.add(group)

  const geometry = new THREE.IcosahedronGeometry(1, 12)

  // Usar el material del sol con textura
  const material = getSunMaterial({
    coreColor: 0xffff00, // Color del núcleo
    rimColor: 0xffaa00, // Color del borde
    textureUrl: '/sun.jpg', // Ruta de la textura
  })

  // Crear la malla del sol
  const mesh = new THREE.Mesh(geometry, material)
  mesh.name = 'sunMesh'
  group.add(mesh)
  group.position.set(-50, 0.5, 3)
  group.scale.setScalar(5)

  return group
}

export default createSun
