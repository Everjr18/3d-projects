import * as THREE from 'three'
import { MeshComponent } from '../base/MeshComponent'

export function createCube(
  size: number = 1,
  color: number = 0xffffff,
  wireframe: boolean = false
): MeshComponent {
  const geometry = new THREE.BoxGeometry(size, size, size)
  const material = new THREE.MeshStandardMaterial({
    color: color,
    wireframe: wireframe,
  })

  const cubeComponent = new MeshComponent(geometry, material)
  return cubeComponent
}
