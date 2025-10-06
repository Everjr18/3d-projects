import * as THREE from 'three'
import { MeshComponent } from './MeshComponent'

/**
 * Configuration for a textured sphere
 */
export interface TexturedSphereConfig {
  radius?: number
  widthSegments?: number
  heightSegments?: number
  textureMap?: string
  bumpMap?: string
  specularMap?: string
  normalMap?: string
  bumpScale?: number
  shininess?: number
  specular?: number
}

/**
 * Reusable component for creating textured spheres
 * Used for planets, moons, and other spherical objects
 */
export class TexturedSphereComponent extends MeshComponent {
  private textureLoader: THREE.TextureLoader

  constructor(config: TexturedSphereConfig = {}) {
    const {
      radius = 1,
      widthSegments = 32,
      heightSegments = 32,
      textureMap,
      bumpMap,
      specularMap,
      bumpScale = 0.04,
      shininess = 30,
      specular = 0x333333,
    } = config

    const geometry = new THREE.IcosahedronGeometry(radius, 12)
    const material = new THREE.MeshPhongMaterial({
      shininess,
      specular,
    })

    super(geometry, material)
    this.textureLoader = new THREE.TextureLoader()

    // Load textures if provided
    if (textureMap) {
      material.map = this.textureLoader.load(textureMap)
    }
    if (bumpMap) {
      material.bumpMap = this.textureLoader.load(bumpMap)
      material.bumpScale = bumpScale
    }
    if (specularMap) {
      material.specularMap = this.textureLoader.load(specularMap)
    }
  }

  updateTexture(textureMap: string): void {
    const material = this.mesh.material as THREE.MeshPhongMaterial
    material.map = this.textureLoader.load(textureMap)
    material.needsUpdate = true
  }
}
