import * as THREE from 'three'

/**
 * Configuration for a single layer
 */
export interface LayerConfig {
  name: string
  mesh: THREE.Mesh
  scale?: number
  rotationSpeed?: number
}

/**
 * Component for managing multiple layers of meshes
 * Useful for objects with clouds, glow effects, atmospheres, etc.
 */
export class LayeredMeshComponent {
  private group: THREE.Group
  private layers: Map<string, LayerConfig> = new Map()

  constructor(name: string = 'LayeredObject') {
    this.group = new THREE.Group()
    this.group.name = name
  }

  /**
   * Add a layer to the object
   */
  addLayer(config: LayerConfig): void {
    const { name, mesh, scale = 1 } = config

    mesh.name = name
    mesh.scale.setScalar(scale)

    this.layers.set(name, config)
    this.group.add(mesh)
  }

  /**
   * Remove a layer by name
   */
  removeLayer(name: string): void {
    const layer = this.layers.get(name)
    if (layer) {
      this.group.remove(layer.mesh)
      this.layers.delete(name)
    }
  }

  /**
   * Get a specific layer mesh
   */
  getLayer(name: string): THREE.Mesh | undefined {
    return this.layers.get(name)?.mesh
  }

  /**
   * Get all layers
   */
  getAllLayers(): Map<string, LayerConfig> {
    return this.layers
  }

  /**
   * Get the group containing all layers
   */
  getGroup(): THREE.Group {
    return this.group
  }

  /**
   * Update all layers (handles rotation if configured)
   */
  update(deltaTime: number): void {
    this.layers.forEach((layer) => {
      if (layer.rotationSpeed) {
        layer.mesh.rotation.y += layer.rotationSpeed * deltaTime
      }
    })
  }

  /**
   * Set position for the entire group
   */
  setPosition(x: number, y: number, z: number): void {
    this.group.position.set(x, y, z)
  }

  /**
   * Set scale for the entire group
   */
  setScale(scale: number): void {
    this.group.scale.setScalar(scale)
  }

  /**
   * Clean up resources
   */
  dispose(): void {
    this.layers.forEach((layer) => {
      layer.mesh.geometry.dispose()
      if (Array.isArray(layer.mesh.material)) {
        layer.mesh.material.forEach((mat) => mat.dispose())
      } else {
        layer.mesh.material.dispose()
      }
    })
    this.layers.clear()
    this.group.clear()
  }
}
