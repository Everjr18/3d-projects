import * as THREE from 'three'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js'
import { CelestialBody } from './CelestialBody'
import { RotationComponent } from '../base/RotationComponent'
import { CELESTIAL_BODIES, TEXTURE_PATHS } from '../../config/constants'

export class Satellite extends CelestialBody {
  private rotationComponent: RotationComponent

  constructor() {
    super({
      name: CELESTIAL_BODIES.SATELLITE.NAME,
      position: CELESTIAL_BODIES.SATELLITE.POSITION,
      scale: CELESTIAL_BODIES.SATELLITE.SCALE,
      cameraOffset: CELESTIAL_BODIES.SATELLITE.CAMERA_OFFSET,
    })

    // Create rotation component for the satellite
    this.rotationComponent = new RotationComponent(this.group, {
      speed: { y: 0.01 },
    })
  }

  async create(): Promise<void> {
    return new Promise((resolve, reject) => {
      const objLoader = new OBJLoader()
      const mtlLoader = new MTLLoader()

      mtlLoader.load(
        TEXTURE_PATHS.SATELLITE.MTL,
        mtl => {
          mtl.preload()

          // Configure materials
          for (const material of Object.values(mtl.materials)) {
            material.side = THREE.DoubleSide
          }

          objLoader.setMaterials(mtl)
          objLoader.load(
            TEXTURE_PATHS.SATELLITE.OBJ,
            object => {
              // Position the satellite (scaling is handled by the group)
              object.translateY(1)
              object.translateX(1)
              object.translateZ(1)
              object.rotation.x = Math.PI / 4

              // Set the mesh name for interaction
              if (object.children[0] instanceof THREE.Mesh) {
                object.children[0].name = CELESTIAL_BODIES.SATELLITE.NAME
                this.meshes.set(CELESTIAL_BODIES.SATELLITE.NAME, object.children[0])
              }

              this.group.add(object)
              resolve()
            },
            undefined,
            error => {
              console.error('Error loading satellite OBJ:', error)
              reject(error)
            }
          )
        },
        undefined,
        error => {
          console.error('Error loading satellite MTL:', error)
          reject(error)
        }
      )
    })
  }

  update(deltaTime: number): void {
    // Update rotation using component
    this.rotationComponent.update(deltaTime)
  }
}
