import * as THREE from 'three'
import { RotationComponent } from '../base/RotationComponent'
import { STAR_FIELD_CONFIG, TEXTURE_PATHS, ANIMATION_CONFIG } from '../../config/constants'

export class StarField {
  private points: THREE.Points
  private rotationComponent: RotationComponent
  private name: string = 'starField'

  constructor() {
    this.points = this.createStarField()
    this.points.name = this.name

    // Create rotation component (negative speed for opposite direction)
    const starRotationSpeed =
      ANIMATION_CONFIG.EARTH_ROTATION_SPEED * ANIMATION_CONFIG.STAR_ROTATION_RATIO
    this.rotationComponent = new RotationComponent(this.points, {
      speed: { y: -starRotationSpeed },
    })
  }

  private createStarField(): THREE.Points {
    const { NUM_STARS, MIN_RADIUS, MAX_RADIUS, POINT_SIZE, HUE, SATURATION } = STAR_FIELD_CONFIG

    const vertices: number[] = []
    const colors: number[] = []

    for (let i = 0; i < NUM_STARS; i++) {
      const point = this.randomSpherePoint(MIN_RADIUS, MAX_RADIUS)
      const color = new THREE.Color().setHSL(HUE, SATURATION, Math.random())

      vertices.push(point.x, point.y, point.z)
      colors.push(color.r, color.g, color.b)
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: POINT_SIZE,
      vertexColors: true,
      map: new THREE.TextureLoader().load(TEXTURE_PATHS.STAR),
    })

    return new THREE.Points(geometry, material)
  }

  private randomSpherePoint(minRadius: number, maxRadius: number): THREE.Vector3 {
    const radius = Math.random() * (maxRadius - minRadius) + minRadius
    const u = Math.random()
    const v = Math.random()
    const theta = 2 * Math.PI * u
    const phi = Math.acos(2 * v - 1)

    const x = radius * Math.sin(phi) * Math.cos(theta)
    const y = radius * Math.sin(phi) * Math.sin(theta)
    const z = radius * Math.cos(phi)

    return new THREE.Vector3(x, y, z)
  }

  getPoints(): THREE.Points {
    return this.points
  }

  update(deltaTime: number): void {
    // Update rotation using component
    this.rotationComponent.update(deltaTime)
  }

  dispose(): void {
    this.points.geometry.dispose()
    if (this.points.material instanceof THREE.Material) {
      this.points.material.dispose()
    }
  }
}
