import * as THREE from 'three'
import checkIntersection from '../../src/components/interaction/checkIntersection'
import PreviewScene from '../../src/components/scene/createPreviewScene'
import { SceneManager } from '../../src/components/managers/SceneManager'
import { UIController } from '../../src/components/managers/UIController'
import { AnimationLoop } from '../../src/components/managers/AnimationLoop'

const sceneManager = new SceneManager()
sceneManager.setup()

const uiController = new UIController({
  renderer: sceneManager.getRenderer(),
  camera: sceneManager.getCamera(),
  cloudsMesh: sceneManager.getCloudsMesh(),
  sunLight: sceneManager.getSunLight(),
  ambientLight: sceneManager.getAmbientLight(),
})
uiController.setup()

const animationLoop = new AnimationLoop(
  {
    renderer: sceneManager.getRenderer(),
    scene: sceneManager.getScene(),
    camera: sceneManager.getCamera(),
    controls: sceneManager.getControls(),
    earthMesh: sceneManager.getEarthMesh(),
    lightMesh: sceneManager.getLightMesh(),
    cloudsMesh: sceneManager.getCloudsMesh(),
    glowMesh: sceneManager.getGlowMesh(),
    earthGroup: sceneManager.getEarthGroup(),
    starfield: sceneManager.getStarfield(),
  },
  {
    getRotationSpeed: uiController.getRotationSpeed,
    getStarsSpeed: uiController.getStarsSpeed,
    getAutoRotateCamera: uiController.getAutoRotateCamera,
  }
)
animationLoop.start()

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
