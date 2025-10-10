import * as THREE from 'three'
import checkIntersection from '../../src/components/interaction/checkIntersection'
import PreviewScene from '../../src/components/scene/createPreviewScene'
import { PrimitivesManager } from '../../src/components/managers/PrimitivesManager'
import { UIController } from '../../src/components/managers/UIController'

const sceneManager = new PrimitivesManager()
sceneManager.setup()

const uiController = new UIController({
  renderer: sceneManager.getRenderer(),
  camera: sceneManager.getCamera(),
  sunLight: sceneManager.getSunLight(),
  ambientLight: sceneManager.getAmbientLight(),
})
uiController.setup()

// Animation loop for primitives
function animate() {
  requestAnimationFrame(animate)

  const speed = uiController.getRotationSpeed()
  const starsSpeed = uiController.getStarsSpeed()
  const autoRotateCamera = uiController.getAutoRotateCamera()

  // Rotate primitives
  sceneManager.getScene().traverse((object) => {
    if (object.name === 'cubeMesh' || object.name === 'cylinderMesh' || object.name === 'sphereMesh' || object.name === 'pyramidMesh') {
      object.rotation.y += 0.01 * speed
      object.rotation.x += 0.005 * speed
    }
  })

  // Rotate starfield
  const starfield = sceneManager.getStarfield()
  if (starfield) {
    starfield.rotation.y -= (0.01 / 30) * starsSpeed
  }

  // Auto-rotate camera
  const controls = sceneManager.getControls()
  controls.autoRotate = autoRotateCamera
  controls.update()

  sceneManager.getRenderer().render(sceneManager.getScene(), sceneManager.getCamera())
}
animate()

let previewScene: PreviewScene | null = null
const previewCanvas = document.getElementById('preview-canvas') as HTMLCanvasElement
if (previewCanvas) {
  setTimeout(() => {
    previewScene = new PreviewScene(previewCanvas)
  }, 100)
}

const raycaster = new THREE.Raycaster()
window.addEventListener('click', (event: MouseEvent) => {
  checkIntersection(
    event.clientX,
    event.clientY,
    raycaster,
    sceneManager.getCamera(),
    sceneManager.getScene(),
    sceneManager.getControls(),
    previewScene
  )
})

window.addEventListener('touchend', (event: TouchEvent) => {
  if (event.changedTouches.length > 0) {
    const touch = event.changedTouches[0]
    checkIntersection(
      touch.clientX,
      touch.clientY,
      raycaster,
      sceneManager.getCamera(),
      sceneManager.getScene(),
      sceneManager.getControls(),
      previewScene
    )
  }
})

const sidebarToggle = document.getElementById('sidebar-toggle')
const sidebar = document.getElementById('sidebar')

sidebarToggle?.addEventListener('click', () => {
  sidebar?.classList.toggle('sidebar-open')
})
