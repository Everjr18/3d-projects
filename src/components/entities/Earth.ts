import * as THREE from 'three'
import { CelestialBody } from './CelestialBody'
import { LayeredMeshComponent } from '../base/LayeredMeshComponent'
import { RotationComponent } from '../base/RotationComponent'
import { CELESTIAL_BODIES, TEXTURE_PATHS, ANIMATION_CONFIG } from '../../config/constants'
import { getFresnelMat } from '../../shaders/getFresnelMat'

export class Earth extends CelestialBody {
  private layers: LayeredMeshComponent
  private rotationComponent: RotationComponent

  constructor() {
    super({
      name: CELESTIAL_BODIES.EARTH.NAME,
      position: CELESTIAL_BODIES.EARTH.POSITION,
      scale: CELESTIAL_BODIES.EARTH.SCALE,
      rotationSpeed: ANIMATION_CONFIG.EARTH_ROTATION_SPEED,
      cameraOffset: CELESTIAL_BODIES.EARTH.CAMERA_OFFSET,
    })

    this.layers = new LayeredMeshComponent('EarthLayers')
    this.rotationComponent = new RotationComponent(this.group, {
      speed: { y: ANIMATION_CONFIG.EARTH_ROTATION_SPEED },
    })
  }

  async create(): Promise<void> {
    const geometry = this.createGeometry()

    // Main Earth surface
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: this.loadTexture(TEXTURE_PATHS.EARTH.MAP),
      specularMap: this.loadTexture(TEXTURE_PATHS.EARTH.SPECULAR),
      bumpMap: this.loadTexture(TEXTURE_PATHS.EARTH.BUMP),
      bumpScale: 0.04,
      shininess: 30,
      specular: 0x333333,
    })

    const earthMesh = new THREE.Mesh(geometry, earthMaterial)
    this.layers.addLayer({
      name: CELESTIAL_BODIES.EARTH.LAYERS.SURFACE,
      mesh: earthMesh,
      rotationSpeed: ANIMATION_CONFIG.EARTH_ROTATION_SPEED,
    })

    // City lights
    const lightsMaterial = new THREE.MeshBasicMaterial({
      map: this.loadTexture(TEXTURE_PATHS.EARTH.LIGHTS),
      blending: THREE.AdditiveBlending,
    })

    const lightsMesh = new THREE.Mesh(geometry, lightsMaterial)
    this.layers.addLayer({
      name: CELESTIAL_BODIES.EARTH.LAYERS.LIGHTS,
      mesh: lightsMesh,
      rotationSpeed: ANIMATION_CONFIG.EARTH_ROTATION_SPEED,
    })

    // Clouds
    const cloudsMaterial = new THREE.MeshStandardMaterial({
      map: this.loadTexture(TEXTURE_PATHS.EARTH.CLOUDS),
      alphaMap: this.loadTexture(TEXTURE_PATHS.EARTH.CLOUDS_ALPHA),
      transparent: true,
      opacity: 0.8,
      roughness: 1.0,
    })

    const cloudsMesh = new THREE.Mesh(geometry, cloudsMaterial)
    this.layers.addLayer({
      name: CELESTIAL_BODIES.EARTH.LAYERS.CLOUDS,
      mesh: cloudsMesh,
      scale: 1.003,
      rotationSpeed: ANIMATION_CONFIG.EARTH_ROTATION_SPEED + ANIMATION_CONFIG.CLOUD_EXTRA_SPEED,
    })

    // Atmospheric glow
    const fresnelMaterial = getFresnelMat({ rimHex: 0x0088ff, facingHex: 0x000000 })
    const glowMesh = new THREE.Mesh(geometry, fresnelMaterial)
    this.layers.addLayer({
      name: CELESTIAL_BODIES.EARTH.LAYERS.GLOW,
      mesh: glowMesh,
      scale: 1.01,
      rotationSpeed: ANIMATION_CONFIG.EARTH_ROTATION_SPEED,
    })

    // Add all layers to the group
    this.group.add(this.layers.getGroup())

    // Store meshes in the base class map for compatibility
    this.layers.getAllLayers().forEach((layer, name) => {
      this.meshes.set(name, layer.mesh)
    })
  }

  update(deltaTime: number): void {
    // Update layers rotation
    this.layers.update(deltaTime)
  }

  getCloudsMesh(): THREE.Mesh | undefined {
    return this.layers.getLayer(CELESTIAL_BODIES.EARTH.LAYERS.CLOUDS)
  }

  getLightMesh(): THREE.Mesh | undefined {
    return this.layers.getLayer(CELESTIAL_BODIES.EARTH.LAYERS.LIGHTS)
  }

  getGlowMesh(): THREE.Mesh | undefined {
    return this.layers.getLayer(CELESTIAL_BODIES.EARTH.LAYERS.GLOW)
  }

  dispose(): void {
    this.layers.dispose()
    super.dispose()
  }
}
