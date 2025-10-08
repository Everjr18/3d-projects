import * as THREE from 'three'
import type { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const BASE_SPEED = 0.0115

interface AnimationElements {
  renderer: THREE.WebGLRenderer
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  controls: OrbitControls
  earthMesh: THREE.Mesh
  lightMesh: THREE.Mesh
  cloudsMesh: THREE.Mesh
  glowMesh: THREE.Mesh
  earthGroup: THREE.Group
  starfield: THREE.Points
}

interface AnimationConfig {
  getRotationSpeed: () => number
  getStarsSpeed: () => number
  getAutoRotateCamera: () => boolean
}

export class AnimationLoop {
  constructor(elements: AnimationElements, config: AnimationConfig) {
    let m_animationId: number | null = null

    this.start = start
    this.stop = stop

    function start() {
      if (m_animationId !== null) return

      animate()

      function animate() {
        const speed = BASE_SPEED * config.getRotationSpeed()

        m_animationId = requestAnimationFrame(animate)

        elements.earthMesh.rotation.y += speed
        elements.lightMesh.rotation.y += speed
        elements.cloudsMesh.rotation.y += speed + 0.002 * config.getRotationSpeed()
        elements.glowMesh.rotation.y += speed
        elements.starfield.rotation.y -= (speed / 30) * config.getStarsSpeed()
        elements.earthGroup.rotateOnAxis(elements.earthGroup.up, speed / 27)

        elements.controls.autoRotate = config.getAutoRotateCamera()
        elements.controls.update()

        elements.renderer.render(elements.scene, elements.camera)
      }
    }

    function stop() {
      if (m_animationId !== null) {
        cancelAnimationFrame(m_animationId)
        m_animationId = null
      }
    }
  }

  start!: () => void
  stop!: () => void
}
