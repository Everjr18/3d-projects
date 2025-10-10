import * as THREE from 'three'
import { MeshComponent } from '../base/MeshComponent'

export function createSphere(
  radius: number = 1,
  color: number = 0xffffff,
  wireframe: boolean = false
): MeshComponent {
  const geometry = new THREE.SphereGeometry(radius, 32, 32)
  const material = new THREE.MeshStandardMaterial({
    color: color,
    wireframe: wireframe,
  })

  const sphereComponent = new MeshComponent(geometry, material)
  return sphereComponent
}
