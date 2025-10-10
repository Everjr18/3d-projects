import * as THREE from 'three'
import { MeshComponent } from '../base/MeshComponent'

export function createPyramid(
  radius: number = 1,
  height: number = 2,
  color: number = 0xffffff,
  wireframe: boolean = false
): MeshComponent {
  // Una pirámide es un cono con 4 segmentos radiales
  const geometry = new THREE.ConeGeometry(radius, height, 4)
  const material = new THREE.MeshStandardMaterial({
    color: color,
    wireframe: wireframe,
  })

  const pyramidComponent = new MeshComponent(geometry, material)
  return pyramidComponent
}
