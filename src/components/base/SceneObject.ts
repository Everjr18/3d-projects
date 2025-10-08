import * as THREE from 'three'

export class SceneObject {
  constructor() {
    let m_object3D: THREE.Object3D | null = null
    let m_name = ''

    this.getObject3D = getObject3D
    this.setObject3D = setObject3D
    this.setPosition = setPosition
    this.setScale = setScale
    this.setRotation = setRotation
    this.getName = getName
    this.setName = setName
    this.addToScene = addToScene
    this.removeFromScene = removeFromScene
    this.dispose = dispose
    function getObject3D(): THREE.Object3D {
      if (!m_object3D) {
        throw new Error('Object3D not initialized')
      }
      return m_object3D
    }

    function setObject3D(obj: THREE.Object3D): void {
      m_object3D = obj
      if (m_name) {
        m_object3D.name = m_name
      }
    }

    function setPosition(x: number, y: number, z: number): void {
      getObject3D().position.set(x, y, z)
    }

    function setScale(scale: number): void {
      getObject3D().scale.setScalar(scale)
    }

    function setRotation(x: number, y: number, z: number): void {
      getObject3D().rotation.set(x, y, z)
    }

    function getName(): string {
      return m_name
    }

    function setName(name: string): void {
      m_name = name
      if (m_object3D) {
        m_object3D.name = name
      }
    }

    function addToScene(scene: THREE.Scene): void {
      scene.add(getObject3D())
    }

    function removeFromScene(scene: THREE.Scene): void {
      scene.remove(getObject3D())
    }

    function dispose(): void {
      const obj = getObject3D()

      obj.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry?.dispose()

          if (Array.isArray(child.material)) {
            child.material.forEach((mat) => mat.dispose())
          } else if (child.material) {
            child.material.dispose()
          }
        }
      })

      if (obj.parent) {
        obj.parent.remove(obj)
      }

      m_object3D = null
    }
  }

  getObject3D!: () => THREE.Object3D
  setObject3D!: (obj: THREE.Object3D) => void
  setPosition!: (x: number, y: number, z: number) => void
  setScale!: (scale: number) => void
  setRotation!: (x: number, y: number, z: number) => void
  getName!: () => string
  setName!: (name: string) => void
  addToScene!: (scene: THREE.Scene) => void
  removeFromScene!: (scene: THREE.Scene) => void
  dispose!: () => void
}
