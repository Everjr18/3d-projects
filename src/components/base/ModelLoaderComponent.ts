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
                if (config.position) {
                  root.position.set(config.position.x, config.position.y, config.position.z)
                }

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

                if (config.meshName && root.children[0]) {
                  root.children[0].name = config.meshName
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
