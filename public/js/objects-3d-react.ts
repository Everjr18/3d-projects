import * as THREE from 'three'
import checkIntersection from '../../src/components/interaction/checkIntersection'
import PreviewScene from '../../src/components/scene/createPreviewScene'
import { Objects3DManager } from '../../src/components/managers/Objects3DManager'
import { UIController } from '../../src/components/managers/UIController'

export interface SceneAPI {
  setBrightness: (value: number) => void
  setSpeed: (value: number) => void
  setFov: (value: number) => void
  setAmbientLight: (value: number) => void
  setDirectionalLight: (value: number) => void
  setStarsSpeed: (value: number) => void
  setAutoRotate: (value: boolean) => void
  cleanup: () => void
}

export function initScene(container: HTMLElement): SceneAPI {
  // Asignar ID temporalmente para que Objects3DManager lo encuentre
  container.id = 'canvas-container'

  const sceneManager = new Objects3DManager()
  sceneManager.setup()

  const uiController = new UIController({
    renderer: sceneManager.getRenderer(),
    camera: sceneManager.getCamera(),
    sunLight: sceneManager.getSunLight(),
    ambientLight: sceneManager.getAmbientLight(),
  })

  // No llamamos a uiController.setup() porque React maneja la UI
  let rotationSpeed = 1.0
  let starsSpeed = 1.0
  let autoRotateCamera = true

  // Animation loop
  let animationId: number | null = null
  function animate() {
    animationId = requestAnimationFrame(animate)

    // Rotate skull model
    const skullGroup = sceneManager.getSkullGroup()
    if (skullGroup) {
      skullGroup.rotation.y += 0.008 * rotationSpeed
    }

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

  // Exponer función global para crear preview desde React
  ;(window as any).createPreviewForObject = (objectName: string | null, canvas: HTMLCanvasElement) => {
    if (!previewScene && canvas) {
      previewScene = new PreviewScene(canvas)
    }
    if (previewScene && objectName) {
      previewScene.showObject(objectName)
    }
  }

  const raycaster = new THREE.Raycaster()

  const handleClick = (clientX: number, clientY: number) => {
    checkIntersection(
      clientX,
      clientY,
      raycaster,
      sceneManager.getCamera(),
      sceneManager.getScene(),
      sceneManager.getControls(),
      previewScene
    )
  }

  const clickHandler = (event: MouseEvent) => {
    handleClick(event.clientX, event.clientY)
  }

  const touchHandler = (event: TouchEvent) => {
    if (event.changedTouches.length > 0) {
      const touch = event.changedTouches[0]
      handleClick(touch.clientX, touch.clientY)
    }
  }

  window.addEventListener('click', clickHandler)
  window.addEventListener('touchend', touchHandler)

  // API para que React controle el scene
  return {
    setBrightness: (value: number) => {
      sceneManager.getRenderer().toneMappingExposure = value
    },

    setSpeed: (value: number) => {
      rotationSpeed = value
    },

    setFov: (value: number) => {
      const camera = sceneManager.getCamera()
      camera.fov = value
      camera.updateProjectionMatrix()
    },

    setAmbientLight: (value: number) => {
      sceneManager.getAmbientLight().intensity = value
    },

    setDirectionalLight: (value: number) => {
      sceneManager.getSunLight().intensity = value
    },

    setStarsSpeed: (value: number) => {
      starsSpeed = value
    },

    setAutoRotate: (value: boolean) => {
      autoRotateCamera = value
    },

    cleanup: () => {
      if (animationId !== null) {
        cancelAnimationFrame(animationId)
      }
      window.removeEventListener('click', clickHandler)
      window.removeEventListener('touchend', touchHandler)
    },
  }
}
