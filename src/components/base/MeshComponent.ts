import * as THREE from 'three'

/**
 * Base component for managing a Three.js mesh
 * Provides basic functionality for any 3D object
 */
export class MeshComponent {
  protected mesh: THREE.Mesh

  constructor(geometry: THREE.BufferGeometry, material: THREE.Material) {
    this.mesh = new THREE.Mesh(geometry, material)
  }

  getMesh(): THREE.Mesh {
    return this.mesh
  }

  setPosition(x: number, y: number, z: number): void {
    this.mesh.position.set(x, y, z)
  }

  setScale(scale: number): void {
    this.mesh.scale.setScalar(scale)
  }

  setName(name: string): void {
    this.mesh.name = name
  }

  dispose(): void {
    this.mesh.geometry.dispose()
    if (Array.isArray(this.mesh.material)) {
      this.mesh.material.forEach((mat) => mat.dispose())
    } else {
      this.mesh.material.dispose()
    }
  }
}
