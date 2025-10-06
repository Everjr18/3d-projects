import * as THREE from 'three'
import { EventEmitter } from '../../utils/EventEmitter'

export interface CelestialBodyConfig {
  name: string
  position: { x: number; y: number; z: number }
  scale: number
  rotationSpeed?: number
  orbitalSpeed?: number
  cameraOffset: { x: number; y: number; z: number }
}

export abstract class CelestialBody extends EventEmitter {
  protected group: THREE.Group
  protected config: CelestialBodyConfig
  protected meshes: Map<string, THREE.Mesh> = new Map()

  constructor(config: CelestialBodyConfig) {
    super()
    this.config = config
    this.group = new THREE.Group()
    this.group.name = config.name + 'Group'
    this.group.position.set(config.position.x, config.position.y, config.position.z)
    this.group.scale.setScalar(config.scale)
  }

  abstract create(): Promise<void>

  getGroup(): THREE.Group {
    return this.group
  }

  getName(): string {
    return this.config.name
  }

  getCameraOffset(): { x: number; y: number; z: number } {
    return this.config.cameraOffset
  }

  getMesh(name?: string): THREE.Mesh | undefined {
    if (name) {
      return this.meshes.get(name)
    }
    // Return the first mesh if no name specified
    return this.meshes.values().next().value
  }

  getAllMeshes(): THREE.Mesh[] {
    return Array.from(this.meshes.values())
  }

  getWorldPosition(): THREE.Vector3 {
    const worldPosition = new THREE.Vector3()
    this.group.getWorldPosition(worldPosition)
    return worldPosition
  }

  update(deltaTime: number): void {
    // Default implementation - can be overridden by subclasses
    if (this.config.rotationSpeed) {
      this.group.rotation.y += this.config.rotationSpeed * deltaTime
    }
  }

  dispose(): void {
    this.group.clear()
    this.meshes.clear()
    this.removeAllListeners()
  }

  protected addMesh(name: string, mesh: THREE.Mesh): void {
    mesh.name = name
    this.meshes.set(name, mesh)
    this.group.add(mesh)
  }

  protected createGeometry(): THREE.BufferGeometry {
    return new THREE.IcosahedronGeometry(1, 12)
  }

  protected loadTexture(path: string): THREE.Texture {
    const loader = new THREE.TextureLoader()
    return loader.load(path)
  }
}
