import * as THREE from 'three'

/**
 * Configuration for rotation behavior
 */
export interface RotationConfig {
  speed?: { x?: number; y?: number; z?: number }
  axis?: THREE.Vector3
}

/**
 * Component for handling rotation of 3D objects
 * Can be attached to any Object3D (mesh, group, etc.)
 */
export class RotationComponent {
  private object: THREE.Object3D
  private speed: THREE.Vector3
  private customAxis?: THREE.Vector3

  constructor(object: THREE.Object3D, config: RotationConfig = {}) {
    this.object = object

    const { speed = {}, axis } = config
    this.speed = new THREE.Vector3(
      speed.x ?? 0,
      speed.y ?? 0.001,
      speed.z ?? 0
    )
    this.customAxis = axis
  }

  /**
   * Set rotation speed for each axis
   */
  setSpeed(x?: number, y?: number, z?: number): void {
    if (x !== undefined) this.speed.x = x
    if (y !== undefined) this.speed.y = y
    if (z !== undefined) this.speed.z = z
  }

  /**
   * Set a custom rotation axis
   */
  setAxis(axis: THREE.Vector3): void {
    this.customAxis = axis.normalize()
  }

  /**
   * Update rotation based on delta time
   */
  update(deltaTime: number): void {
    if (this.customAxis) {
      // Rotate around custom axis
      const angle = this.speed.length() * deltaTime
      this.object.rotateOnAxis(this.customAxis, angle)
    } else {
      // Rotate on standard axes
      this.object.rotation.x += this.speed.x * deltaTime
      this.object.rotation.y += this.speed.y * deltaTime
      this.object.rotation.z += this.speed.z * deltaTime
    }
  }

  /**
   * Stop rotation
   */
  stop(): void {
    this.speed.set(0, 0, 0)
  }

  /**
   * Resume rotation with previous or new speed
   */
  resume(speed?: { x?: number; y?: number; z?: number }): void {
    if (speed) {
      this.setSpeed(speed.x, speed.y, speed.z)
    }
  }
}
