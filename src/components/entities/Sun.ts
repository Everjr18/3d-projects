import { CelestialBody } from './CelestialBody'
import { MeshComponent } from '../base/MeshComponent'
import { RotationComponent } from '../base/RotationComponent'
import { CELESTIAL_BODIES } from '../../config/constants'
import { getSunMaterial } from '../../shaders/getSunMaterial'

export class Sun extends CelestialBody {
  private meshComponent?: MeshComponent
  private rotationComponent?: RotationComponent

  constructor() {
    super({
      name: CELESTIAL_BODIES.SUN.NAME,
      position: CELESTIAL_BODIES.SUN.POSITION,
      scale: CELESTIAL_BODIES.SUN.SCALE,
      cameraOffset: CELESTIAL_BODIES.SUN.CAMERA_OFFSET,
    })
  }

  async create(): Promise<void> {
    const geometry = this.createGeometry()
    const material = getSunMaterial({
      coreColor: 0xffaa00,
      rimColor: 0xff6600,
      textureUrl: '/img/sun.jpg',
    })

    // Create mesh using basic component
    this.meshComponent = new MeshComponent(geometry, material)
    const sunMesh = this.meshComponent.getMesh()
    sunMesh.name = CELESTIAL_BODIES.SUN.NAME
    this.addMesh(CELESTIAL_BODIES.SUN.NAME, sunMesh)

    // Create rotation component
    this.rotationComponent = new RotationComponent(sunMesh, {
      speed: { y: 0.005 },
    })
  }

  update(deltaTime: number): void {
    // Update rotation using component
    if (this.rotationComponent) {
      this.rotationComponent.update(deltaTime)
    }
  }

  dispose(): void {
    if (this.meshComponent) {
      this.meshComponent.dispose()
    }
    super.dispose()
  }
}
