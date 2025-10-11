import * as THREE from 'three'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js'
import { SceneObject } from './SceneObject'

interface ModelConfig {
  objPath: string
  mtlPath: string
  position?: { x: number; y: number; z: number }
  scale?: number | { x: number; y: number; z: number }
  rotation?: { x: number; y: number; z: number }
  meshName?: string
  centerGeometry?: boolean
}

export class ModelLoaderComponent extends SceneObject {
  constructor() {
    super()

    const m_group = new THREE.Group()
    let m_loaded = false

    this.setObject3D(m_group)

    this.load = load
    this.isLoaded = isLoaded

    async function load(config: ModelConfig): Promise<void> {
      return new Promise((resolve, reject) => {
        const objLoader = new OBJLoader()
        const mtlLoader = new MTLLoader()

        mtlLoader.load(
          config.mtlPath,
          (mtl) => {
            mtl.preload()
            for (const material of Object.values(mtl.materials)) {
              material.side = THREE.DoubleSide
            }
            objLoader.setMaterials(mtl)
            objLoader.load(
              config.objPath,
              (root) => {
                if (config.scale) {
                  if (typeof config.scale === 'number') {
                    root.scale.setScalar(config.scale)
                  } else {
                    root.scale.set(config.scale.x, config.scale.y, config.scale.z)
                  }
                }

                if (config.rotation) {
                  root.rotation.set(config.rotation.x, config.rotation.y, config.rotation.z)
                }

                if (config.meshName) {
                  root.name = config.meshName
                  root.traverse((child) => {
                    if (child instanceof THREE.Mesh && config.meshName) {
                      child.name = config.meshName
                    }
                  })
                }

                // Center geometry if requested - do this after scale/rotation
                if (config.centerGeometry) {
                  const box = new THREE.Box3().setFromObject(root)
                  const center = box.getCenter(new THREE.Vector3())

                  // Offset all children by the negative center
                  root.traverse((child) => {
                    if (child instanceof THREE.Mesh) {
                      child.geometry.translate(-center.x, -center.y, -center.z)
                    }
                  })
                }

                if (config.position) {
                  root.position.set(config.position.x, config.position.y, config.position.z)
                }

                m_group.add(root)
                m_loaded = true
                resolve()
              },
              undefined,
              (error) => {
                reject(error)
              }
            )
          },
          undefined,
          (error) => {
            reject(error)
          }
        )
      })
    }

    function isLoaded(): boolean {
      return m_loaded
    }
  }

  load!: (config: ModelConfig) => Promise<void>
  isLoaded!: () => boolean
}
