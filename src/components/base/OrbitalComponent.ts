import * as THREE from 'three'

/**
 * Configuration for orbital behavior
 */
export interface OrbitalConfig {
  radius?: number
  speed?: number
  axis?: THREE.Vector3
  startAngle?: number
}

/**
 * Component for handling orbital motion around a point or parent object
 * Useful for moons, satellites, or any orbiting objects
 */
export class OrbitalComponent {
  private object: THREE.Object3D
  private radius: number
  private speed: number
  private axis: THREE.Vector3
  private angle: number

  constructor(object: THREE.Object3D, config: OrbitalConfig = {}) {
    this.object = object

    const { radius = 5, speed = 0.001, axis = new THREE.Vector3(0, 1, 0), startAngle = 0 } = config

    this.radius = radius
    this.speed = speed
    this.axis = axis.normalize()
    this.angle = startAngle

    // Set initial position based on radius and start angle
    this.updatePosition()
  }

  /**
   * Set orbital radius
   */
  setRadius(radius: number): void {
    this.radius = radius
    this.updatePosition()
  }

  /**
   * Set orbital speed
   */
  setSpeed(speed: number): void {
    this.speed = speed
  }

  /**
   * Set orbital axis
   */
  setAxis(axis: THREE.Vector3): void {
    this.axis = axis.normalize()
  }

  /**
   * Update position based on current angle
   */
  private updatePosition(): void {
    // Calculate position on circular orbit
    const x = Math.cos(this.angle) * this.radius
    const z = Math.sin(this.angle) * this.radius

    // If orbit is not on XZ plane, rotate the position vector
    if (!this.axis.equals(new THREE.Vector3(0, 1, 0))) {
      const position = new THREE.Vector3(x, 0, z)
      const quaternion = new THREE.Quaternion()
      quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), this.axis)
      position.applyQuaternion(quaternion)
      this.object.position.copy(position)
    } else {
      this.object.position.set(x, 0, z)
    }
  }

  /**
   * Update orbital motion
   */
  update(deltaTime: number): void {
    this.angle += this.speed * deltaTime
    this.updatePosition()
  }

  /**
   * Get current angle in the orbit
   */
  getAngle(): number {
    return this.angle
  }

  /**
   * Set current angle in the orbit
   */
  setAngle(angle: number): void {
    this.angle = angle
    this.updatePosition()
  }

  /**
   * Stop orbital motion
   */
  stop(): void {
    this.speed = 0
  }

  /**
   * Resume orbital motion
   */
  resume(speed?: number): void {
    this.speed = speed ?? (Math.abs(this.speed) || 0.001)
  }
}
