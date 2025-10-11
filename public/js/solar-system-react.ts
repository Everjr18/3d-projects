import * as THREE from 'three'
import checkIntersection from '../../src/components/interaction/checkIntersection'
import PreviewScene from '../../src/components/scene/createPreviewScene'
import { SolarSystemManager } from '../../src/components/managers/SolarSystemManager'
import { UIController } from '../../src/components/managers/UIController'
import { AnimationLoop } from '../../src/components/managers/AnimationLoop'

export interface SceneAPI {
  setBrightness: (value: number) => void
  setSpeed: (value: number) => void
  setFov: (value: number) => void
  setAmbientLight: (value: number) => void
  setDirectionalLight: (value: number) => void
  setCloudsOpacity: (value: number) => void
  setStarsSpeed: (value: number) => void
  setAutoRotate: (value: boolean) => void
  cleanup: () => void
}

export function initScene(container: HTMLElement): SceneAPI {
  // Temporalmente asignamos el container como canvas-container para que SolarSystemManager lo encuentre
  container.id = 'canvas-container'

  const sceneManager = new SolarSystemManager()
  sceneManager.setup()

  const uiController = new UIController({
    renderer: sceneManager.getRenderer(),
    camera: sceneManager.getCamera(),
    cloudsMesh: sceneManager.getCloudsMesh(),
    sunLight: sceneManager.getSunLight(),
    ambientLight: sceneManager.getAmbientLight(),
  })

  // No llamamos a uiController.setup() porque React maneja la UI
  // Inicializamos con valores por defecto
  uiController.setRotationSpeed(1.0)
  uiController.setStarsSpeed(1.0)
  uiController.setAutoRotateCamera(true)

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
      getRotationSpeed: () => uiController.getRotationSpeed(),
      getStarsSpeed: () => uiController.getStarsSpeed(),
      getAutoRotateCamera: () => uiController.getAutoRotateCamera(),
    }
  )
  animationLoop.start()

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
      const renderer = sceneManager.getRenderer()
      renderer.toneMappingExposure = value
    },

    setSpeed: (value: number) => {
      uiController.setRotationSpeed(value)
    },

    setFov: (value: number) => {
      const camera = sceneManager.getCamera()
      camera.fov = value
      camera.updateProjectionMatrix()
    },

    setAmbientLight: (value: number) => {
      const ambientLight = sceneManager.getAmbientLight()
      ambientLight.intensity = value
    },

    setDirectionalLight: (value: number) => {
      const sunLight = sceneManager.getSunLight()
      sunLight.intensity = value
    },

    setCloudsOpacity: (value: number) => {
      const cloudsMesh = sceneManager.getCloudsMesh()
      if (cloudsMesh.material instanceof THREE.Material) {
        ;(cloudsMesh.material as any).opacity = value
      }
    },

    setStarsSpeed: (value: number) => {
      uiController.setStarsSpeed(value)
    },

    setAutoRotate: (value: boolean) => {
      uiController.setAutoRotateCamera(value)
    },

    cleanup: () => {
      window.removeEventListener('click', clickHandler)
      window.removeEventListener('touchend', touchHandler)
      animationLoop.stop()
      // Aquí podrías agregar más limpieza si es necesario
    },
  }
}
