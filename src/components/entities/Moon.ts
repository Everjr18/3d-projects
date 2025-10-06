import { CelestialBody } from './CelestialBody'
import { TexturedSphereComponent } from '../base/TexturedSphereComponent'
import { RotationComponent } from '../base/RotationComponent'
import { CELESTIAL_BODIES, TEXTURE_PATHS, ANIMATION_CONFIG } from '../../config/constants'

export class Moon extends CelestialBody {
  private sphereComponent?: TexturedSphereComponent
  private rotationComponent?: RotationComponent

  constructor() {
    super({
      name: CELESTIAL_BODIES.MOON.NAME,
      position: CELESTIAL_BODIES.MOON.POSITION,
      scale: CELESTIAL_BODIES.MOON.SCALE,
      cameraOffset: CELESTIAL_BODIES.MOON.CAMERA_OFFSET,
    })
  }

  async create(): Promise<void> {
    // Create textured sphere using the component
    this.sphereComponent = new TexturedSphereComponent({
      radius: 1,
      textureMap: TEXTURE_PATHS.MOON.MAP,
      bumpMap: TEXTURE_PATHS.MOON.BUMP,
      bumpScale: 0.02,
      shininess: 1,
      specular: 0x111111,
    })

    const moonMesh = this.sphereComponent.getMesh()
    moonMesh.name = CELESTIAL_BODIES.MOON.NAME
    this.addMesh(CELESTIAL_BODIES.MOON.NAME, moonMesh)

    // Create rotation component for the mesh
    this.rotationComponent = new RotationComponent(moonMesh, {
      speed: { y: ANIMATION_CONFIG.MOON_ROTATION_SPEED },
    })
  }

  update(deltaTime: number): void {
    // Update mesh rotation
    if (this.rotationComponent) {
      this.rotationComponent.update(deltaTime)
    }

    // Moon orbits around Earth - handled by rotating the moon group relative to Earth
    this.group.rotateOnAxis(this.group.up, ANIMATION_CONFIG.MOON_ORBITAL_SPEED * deltaTime)
  }

  dispose(): void {
    if (this.sphereComponent) {
      this.sphereComponent.dispose()
    }
    super.dispose()
  }
}
