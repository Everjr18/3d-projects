import * as THREE from 'three'
import { MinecraftSkinManager } from '../../src/components/managers/MinecraftSkinManager'

const sceneManager = new MinecraftSkinManager()
sceneManager.setup()

// Animation variables
let walkAnimation = true
let animationSpeed = 1.0
let animationTime = 0

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
  // Get the current texture from localStorage or generate from current model
  const dataURL = localStorage.getItem(SKIN_STORAGE_KEY)

  if (!dataURL) {
    alert('No hay skin para exportar. Por favor importa una skin primero.')
    return
  }

  // Better filename with timestamp
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5)
  const filename = `minecraft-skin-${timestamp}.png`

  // Convert dataURL to blob and download
  fetch(dataURL)
    .then(res => res.blob())
    .then(blob => {
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.download = filename
      link.href = url
      link.click()
      URL.revokeObjectURL(url)

      console.log(`Skin exported as ${filename}`)
    })
    .catch(error => {
      console.error('Failed to export skin:', error)
      alert('Error al exportar skin')
    })
})

// Import skin from PNG file
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
      // Validate image dimensions
      if (img.width !== 64 || (img.height !== 64 && img.height !== 32)) {
        alert('Invalid skin dimensions. Must be 64x64 or 64x32 pixels.')
        return
      }

      // Create a canvas to read pixel data
      const canvas = document.createElement('canvas')
      canvas.width = 64
      canvas.height = 64
      const ctx = canvas.getContext('2d')!

      // If it's 64x32, convert to 64x64 (old format)
      if (img.height === 32) {
        ctx.drawImage(img, 0, 0)
        // Mirror right leg to left leg
        ctx.drawImage(canvas, 0, 16, 16, 16, 16, 48, 16, 16)
        // Mirror right arm to left arm
        ctx.drawImage(canvas, 40, 16, 16, 16, 32, 48, 16, 16)
      } else {
        ctx.drawImage(img, 0, 0)
      }

      // Apply texture to model
      applyTextureToModel(canvas)

      // Save to localStorage
      saveSkinToLocalStorage(canvas)

      console.log('Skin imported successfully and saved to localStorage!')
    }

    img.src = event.target?.result as string
  }

  reader.readAsDataURL(file)
})

// Function to apply texture canvas to 3D model
function applyTextureToModel(canvas: HTMLCanvasElement) {
  const texture = new THREE.CanvasTexture(canvas)
  texture.magFilter = THREE.NearestFilter
  texture.minFilter = THREE.NearestFilter
  texture.wrapS = THREE.ClampToEdgeWrapping
  texture.wrapT = THREE.ClampToEdgeWrapping

  // Apply to all parts of the model
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

  // Also apply to overlays
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

// Animation controls
walkAnimationCheckbox?.addEventListener('change', (e) => {
  walkAnimation = (e.target as HTMLInputElement).checked
})

animationSpeedSlider?.addEventListener('input', (e) => {
  animationSpeed = parseFloat((e.target as HTMLInputElement).value)
  animationSpeedValue.textContent = `${animationSpeed.toFixed(1)}x`
})

// Camera controls
fovSlider?.addEventListener('input', (e) => {
  const fov = parseInt((e.target as HTMLInputElement).value)
  fovValue.textContent = `${fov}°`
  sceneManager.getCamera().fov = fov
  sceneManager.getCamera().updateProjectionMatrix()
})

autoRotateCheckbox?.addEventListener('change', (e) => {
  sceneManager.getControls().autoRotate = (e.target as HTMLInputElement).checked
})

// Lighting controls
ambientSlider?.addEventListener('input', (e) => {
  const intensity = parseFloat((e.target as HTMLInputElement).value)
  ambientValue.textContent = intensity.toFixed(2)
  sceneManager.getAmbientLight().intensity = intensity
})

directionalSlider?.addEventListener('input', (e) => {
  const intensity = parseFloat((e.target as HTMLInputElement).value)
  directionalValue.textContent = intensity.toFixed(1)
  sceneManager.getSunLight().intensity = intensity
})

// Animation loop
function animate() {
  requestAnimationFrame(animate)

  // Walking animation
  if (walkAnimation) {
    animationTime += 0.05 * animationSpeed

    // Get the groups (which contain both base mesh and overlay)
    const rightArmGroup = sceneManager.getRightArmGroup()
    const leftArmGroup = sceneManager.getLeftArmGroup()
    const rightLegGroup = sceneManager.getRightLegGroup()
    const leftLegGroup = sceneManager.getLeftLegGroup()

    // Swing arms and legs (opposite motion) - rotate the groups from shoulder/hip
    const swing = Math.sin(animationTime) * 0.5
    rightArmGroup.rotation.x = swing
    leftArmGroup.rotation.x = -swing
    rightLegGroup.rotation.x = -swing
    leftLegGroup.rotation.x = swing
  } else {
    // Reset to neutral pose when animation is disabled
    const rightArmGroup = sceneManager.getRightArmGroup()
    const leftArmGroup = sceneManager.getLeftArmGroup()
    const rightLegGroup = sceneManager.getRightLegGroup()
    const leftLegGroup = sceneManager.getLeftLegGroup()

    rightArmGroup.rotation.x = 0
    leftArmGroup.rotation.x = 0
    rightLegGroup.rotation.x = 0
    leftLegGroup.rotation.x = 0
  }

  // Update controls
  sceneManager.getControls().update()

  // Render
  sceneManager.getRenderer().render(sceneManager.getScene(), sceneManager.getCamera())
}

animate()

// Sidebar toggle
const sidebarToggle = document.getElementById('sidebar-toggle')
const sidebar = document.getElementById('sidebar')

sidebarToggle?.addEventListener('click', () => {
  sidebar?.classList.toggle('sidebar-open')
})

// ============================================
// LocalStorage functions
// ============================================

const SKIN_STORAGE_KEY = 'minecraft-skin-texture'

// Save skin texture to localStorage
function saveSkinToLocalStorage(canvas: HTMLCanvasElement) {
  try {
    const dataURL = canvas.toDataURL('image/png')
    localStorage.setItem(SKIN_STORAGE_KEY, dataURL)
    console.log('Skin saved to localStorage')
  } catch (error) {
    console.error('Failed to save skin to localStorage:', error)
  }
}

// Load skin texture from localStorage
function loadSkinFromLocalStorage() {
  try {
    const dataURL = localStorage.getItem(SKIN_STORAGE_KEY)
    if (!dataURL) {
      console.log('No saved skin found in localStorage')
      return
    }

    const img = new Image()
    img.onload = () => {
      // Create canvas and draw the image
      const canvas = document.createElement('canvas')
      canvas.width = 64
      canvas.height = 64
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0)

      // Apply to model
      applyTextureToModel(canvas)

      console.log('Skin loaded from localStorage')
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

// Load saved skin from localStorage on startup (after all functions are defined)
loadSkinFromLocalStorage()
