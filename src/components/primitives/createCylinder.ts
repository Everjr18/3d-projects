import * as THREE from 'three'
import { MeshComponent } from '../base/MeshComponent'

export function createCylinder(
  radiusTop: number = 1,
  radiusBottom: number = 1,
  height: number = 2,
  color: number = 0xffffff,
  wireframe: boolean = false
): MeshComponent {
  const geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, 32)
  const material = new THREE.MeshStandardMaterial({
    color: color,
    wireframe: wireframe,
  })

  const cylinderComponent = new MeshComponent(geometry, material)
  return cylinderComponent
}
