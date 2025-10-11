import * as THREE from 'three'
import { MinecraftSkinManager } from '../../src/components/managers/MinecraftSkinManager'

const SKIN_STORAGE_KEY = 'minecraft-skin-texture'

export interface SceneAPI {
  cleanup: () => void
}

export function initScene(container: HTMLElement): SceneAPI {
  container.id = 'canvas-container'

  const sceneManager = new MinecraftSkinManager()
  sceneManager.setup()

  // Animation variables
  let walkAnimation = true
  let animationSpeed = 1.0
  let animationTime = 0
  let animationFrameId: number

  // Wait for DOM to be ready before setting up event listeners
  setTimeout(() => {
    setupEventListeners()
    loadSkinFromLocalStorage()
  }, 100)

  function setupEventListeners() {
    // Overlay controls
    const headOverlayEnabled = document.getElementById('head-overlay-enabled') as HTMLInputElement
    const bodyOverlayEnabled = document.getElementById('body-overlay-enabled') as HTMLInputElement
    const armsOverlayEnabled = document.getElementById('arms-overlay-enabled') as HTMLInputElement
    const legsOverlayEnabled = document.getElementById('legs-overlay-enabled') as HTMLInputElement

    // Import/Export buttons
    const importSkinButton = document.getElementById('import-skin') as HTMLButtonElement
    const downloadSkinButton = document.getElementById('download-skin') as HTMLButtonElement
    const skinFileInput = document.getElementById('skin-file-input') as HTMLInputElement

    // Animation controls
    const walkAnimationCheckbox = document.getElementById('walk-animation') as HTMLInputElement
    const animationSpeedSlider = document.getElementById('animation-speed-slider') as HTMLInputElement
    const animationSpeedValue = document.getElementById('animation-speed-value') as HTMLSpanElement

    // Camera controls
    const fovSlider = document.getElementById('fov-slider') as HTMLInputElement
    const fovValue = document.getElementById('fov-value') as HTMLSpanElement
    const autoRotateCheckbox = document.getElementById('auto-rotate-checkbox') as HTMLInputElement

    // Lighting controls
    const ambientSlider = document.getElementById('ambient-slider') as HTMLInputElement
    const ambientValue = document.getElementById('ambient-value') as HTMLSpanElement
    const directionalSlider = document.getElementById('directional-slider') as HTMLInputElement
    const directionalValue = document.getElementById('directional-value') as HTMLSpanElement

    // Overlay handlers
    headOverlayEnabled?.addEventListener('change', (e) => {
      const enabled = (e.target as HTMLInputElement).checked
      sceneManager.getHeadOverlayMesh().visible = enabled
    })

    bodyOverlayEnabled?.addEventListener('change', (e) => {
      const enabled = (e.target as HTMLInputElement).checked
      sceneManager.getBodyOverlayMesh().visible = enabled
    })

    armsOverlayEnabled?.addEventListener('change', (e) => {
      const enabled = (e.target as HTMLInputElement).checked
      sceneManager.getRightArmOverlayMesh().visible = enabled
      sceneManager.getLeftArmOverlayMesh().visible = enabled
    })

    legsOverlayEnabled?.addEventListener('change', (e) => {
      const enabled = (e.target as HTMLInputElement).checked
      sceneManager.getRightLegOverlayMesh().visible = enabled
      sceneManager.getLeftLegOverlayMesh().visible = enabled
    })

    downloadSkinButton?.addEventListener('click', () => {
      const dataURL = localStorage.getItem(SKIN_STORAGE_KEY)

      if (!dataURL) {
        alert('No hay skin para exportar. Por favor importa una skin primero.')
        return
      }

      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5)
      const filename = `minecraft-skin-${timestamp}.png`

      fetch(dataURL)
        .then(res => res.blob())
        .then(blob => {
          const url = URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.download = filename
          link.href = url
          link.click()
          URL.revokeObjectURL(url)
        })
        .catch(error => {
          console.error('Failed to export skin:', error)
          alert('Error al exportar skin')
        })
    })

    importSkinButton?.addEventListener('click', () => {
      skinFileInput.click()
    })

    skinFileInput?.addEventListener('change', (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return

      const reader = new FileReader()
      reader.onload = (event) => {
        const img = new Image()
        img.onload = () => {
          if (img.width !== 64 || (img.height !== 64 && img.height !== 32)) {
            alert('Invalid skin dimensions. Must be 64x64 or 64x32 pixels.')
            return
          }

          const canvas = document.createElement('canvas')
          canvas.width = 64
          canvas.height = 64
          const ctx = canvas.getContext('2d')!

          if (img.height === 32) {
            ctx.drawImage(img, 0, 0)
            ctx.drawImage(canvas, 0, 16, 16, 16, 16, 48, 16, 16)
            ctx.drawImage(canvas, 40, 16, 16, 16, 32, 48, 16, 16)
          } else {
            ctx.drawImage(img, 0, 0)
          }

          applyTextureToModel(canvas)
          saveSkinToLocalStorage(canvas)
        }

        img.src = event.target?.result as string
      }

      reader.readAsDataURL(file)
    })

    walkAnimationCheckbox?.addEventListener('change', (e) => {
      walkAnimation = (e.target as HTMLInputElement).checked
    })

    animationSpeedSlider?.addEventListener('input', (e) => {
      animationSpeed = parseFloat((e.target as HTMLInputElement).value)
      if (animationSpeedValue) {
        animationSpeedValue.textContent = `${animationSpeed.toFixed(1)}x`
      }
    })

    fovSlider?.addEventListener('input', (e) => {
      const fov = parseInt((e.target as HTMLInputElement).value)
      if (fovValue) {
        fovValue.textContent = `${fov}°`
      }
      sceneManager.getCamera().fov = fov
      sceneManager.getCamera().updateProjectionMatrix()
    })

    autoRotateCheckbox?.addEventListener('change', (e) => {
      sceneManager.getControls().autoRotate = (e.target as HTMLInputElement).checked
    })

    ambientSlider?.addEventListener('input', (e) => {
      const intensity = parseFloat((e.target as HTMLInputElement).value)
      if (ambientValue) {
        ambientValue.textContent = intensity.toFixed(2)
      }
      sceneManager.getAmbientLight().intensity = intensity
    })

    directionalSlider?.addEventListener('input', (e) => {
      const intensity = parseFloat((e.target as HTMLInputElement).value)
      if (directionalValue) {
        directionalValue.textContent = intensity.toFixed(1)
      }
      sceneManager.getSunLight().intensity = intensity
    })
  }

  function applyTextureToModel(canvas: HTMLCanvasElement) {
    const texture = new THREE.CanvasTexture(canvas)
    texture.magFilter = THREE.NearestFilter
    texture.minFilter = THREE.NearestFilter
    texture.wrapS = THREE.ClampToEdgeWrapping
    texture.wrapT = THREE.ClampToEdgeWrapping

    const headMaterial = sceneManager.getHeadMesh().material as THREE.MeshLambertMaterial
    const bodyMaterial = sceneManager.getBodyMesh().material as THREE.MeshLambertMaterial
    const rightArmMaterial = sceneManager.getRightArmMesh().material as THREE.MeshLambertMaterial
    const leftArmMaterial = sceneManager.getLeftArmMesh().material as THREE.MeshLambertMaterial
    const rightLegMaterial = sceneManager.getRightLegMesh().material as THREE.MeshLambertMaterial
    const leftLegMaterial = sceneManager.getLeftLegMesh().material as THREE.MeshLambertMaterial

    headMaterial.map = texture
    bodyMaterial.map = texture
    rightArmMaterial.map = texture
    leftArmMaterial.map = texture
    rightLegMaterial.map = texture
    leftLegMaterial.map = texture

    headMaterial.needsUpdate = true
    bodyMaterial.needsUpdate = true
    rightArmMaterial.needsUpdate = true
    leftArmMaterial.needsUpdate = true
    rightLegMaterial.needsUpdate = true
    leftLegMaterial.needsUpdate = true

    const headOverlayMaterial = sceneManager.getHeadOverlayMesh().material as THREE.MeshLambertMaterial
    const bodyOverlayMaterial = sceneManager.getBodyOverlayMesh().material as THREE.MeshLambertMaterial
    const rightArmOverlayMaterial = sceneManager.getRightArmOverlayMesh().material as THREE.MeshLambertMaterial
    const leftArmOverlayMaterial = sceneManager.getLeftArmOverlayMesh().material as THREE.MeshLambertMaterial
    const rightLegOverlayMaterial = sceneManager.getRightLegOverlayMesh().material as THREE.MeshLambertMaterial
    const leftLegOverlayMaterial = sceneManager.getLeftLegOverlayMesh().material as THREE.MeshLambertMaterial

    headOverlayMaterial.map = texture
    bodyOverlayMaterial.map = texture
    rightArmOverlayMaterial.map = texture
    leftArmOverlayMaterial.map = texture
    rightLegOverlayMaterial.map = texture
    leftLegOverlayMaterial.map = texture

    headOverlayMaterial.needsUpdate = true
    bodyOverlayMaterial.needsUpdate = true
    rightArmOverlayMaterial.needsUpdate = true
    leftArmOverlayMaterial.needsUpdate = true
    rightLegOverlayMaterial.needsUpdate = true
    leftLegOverlayMaterial.needsUpdate = true
  }

  function saveSkinToLocalStorage(canvas: HTMLCanvasElement) {
    try {
      const dataURL = canvas.toDataURL('image/png')
      localStorage.setItem(SKIN_STORAGE_KEY, dataURL)
    } catch (error) {
      console.error('Failed to save skin to localStorage:', error)
    }
  }

  function loadSkinFromLocalStorage() {
    try {
      const dataURL = localStorage.getItem(SKIN_STORAGE_KEY)
      if (!dataURL) {
        return
      }

      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = 64
        canvas.height = 64
        const ctx = canvas.getContext('2d')!
        ctx.drawImage(img, 0, 0)

        applyTextureToModel(canvas)
      }

      img.onerror = () => {
        console.error('Failed to load skin image from localStorage')
        localStorage.removeItem(SKIN_STORAGE_KEY)
      }

      img.src = dataURL
    } catch (error) {
      console.error('Failed to load skin from localStorage:', error)
      localStorage.removeItem(SKIN_STORAGE_KEY)
    }
  }

  function animate() {
    animationFrameId = requestAnimationFrame(animate)

    if (walkAnimation) {
      animationTime += 0.05 * animationSpeed

      const rightArmGroup = sceneManager.getRightArmGroup()
      const leftArmGroup = sceneManager.getLeftArmGroup()
      const rightLegGroup = sceneManager.getRightLegGroup()
      const leftLegGroup = sceneManager.getLeftLegGroup()

      const swing = Math.sin(animationTime) * 0.5
      rightArmGroup.rotation.x = swing
      leftArmGroup.rotation.x = -swing
      rightLegGroup.rotation.x = -swing
      leftLegGroup.rotation.x = swing
    } else {
      const rightArmGroup = sceneManager.getRightArmGroup()
      const leftArmGroup = sceneManager.getLeftArmGroup()
      const rightLegGroup = sceneManager.getRightLegGroup()
      const leftLegGroup = sceneManager.getLeftLegGroup()

      rightArmGroup.rotation.x = 0
      leftArmGroup.rotation.x = 0
      rightLegGroup.rotation.x = 0
      leftLegGroup.rotation.x = 0
    }

    sceneManager.getControls().update()
    sceneManager.getRenderer().render(sceneManager.getScene(), sceneManager.getCamera())
  }

  animate()

  return {
    cleanup: () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }
}
