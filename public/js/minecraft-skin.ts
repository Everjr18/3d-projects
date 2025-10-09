import * as THREE from 'three'
import { MinecraftSkinManager } from '../../src/components/managers/MinecraftSkinManager'

const sceneManager = new MinecraftSkinManager()
sceneManager.setup()

// Animation variables
let walkAnimation = true
let animationSpeed = 1.0
let animationTime = 0

// Color pickers
const headColorPicker = document.getElementById('head-color') as HTMLInputElement
const bodyColorPicker = document.getElementById('body-color') as HTMLInputElement
const armsColorPicker = document.getElementById('arms-color') as HTMLInputElement
const legsColorPicker = document.getElementById('legs-color') as HTMLInputElement

// Overlay controls
const headOverlayEnabled = document.getElementById('head-overlay-enabled') as HTMLInputElement
const headOverlayColor = document.getElementById('head-overlay-color') as HTMLInputElement
const bodyOverlayEnabled = document.getElementById('body-overlay-enabled') as HTMLInputElement
const bodyOverlayColor = document.getElementById('body-overlay-color') as HTMLInputElement
const armsOverlayEnabled = document.getElementById('arms-overlay-enabled') as HTMLInputElement
const armsOverlayColor = document.getElementById('arms-overlay-color') as HTMLInputElement
const legsOverlayEnabled = document.getElementById('legs-overlay-enabled') as HTMLInputElement
const legsOverlayColor = document.getElementById('legs-overlay-color') as HTMLInputElement

// Preset buttons
const presetSteve = document.getElementById('preset-steve') as HTMLButtonElement
const presetAlex = document.getElementById('preset-alex') as HTMLButtonElement
const presetZombie = document.getElementById('preset-zombie') as HTMLButtonElement
const presetEnderman = document.getElementById('preset-enderman') as HTMLButtonElement

// Download button
const downloadSkinButton = document.getElementById('download-skin') as HTMLButtonElement

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

// Color change handlers
headColorPicker?.addEventListener('input', (e) => {
  const color = (e.target as HTMLInputElement).value
  const material = sceneManager.getHeadMesh().material as THREE.MeshLambertMaterial
  material.color.set(color)
})

bodyColorPicker?.addEventListener('input', (e) => {
  const color = (e.target as HTMLInputElement).value
  const material = sceneManager.getBodyMesh().material as THREE.MeshLambertMaterial
  material.color.set(color)
})

armsColorPicker?.addEventListener('input', (e) => {
  const color = (e.target as HTMLInputElement).value
  const rightArmMaterial = sceneManager.getRightArmMesh().material as THREE.MeshLambertMaterial
  const leftArmMaterial = sceneManager.getLeftArmMesh().material as THREE.MeshLambertMaterial
  rightArmMaterial.color.set(color)
  leftArmMaterial.color.set(color)
})

legsColorPicker?.addEventListener('input', (e) => {
  const color = (e.target as HTMLInputElement).value
  const rightLegMaterial = sceneManager.getRightLegMesh().material as THREE.MeshLambertMaterial
  const leftLegMaterial = sceneManager.getLeftLegMesh().material as THREE.MeshLambertMaterial
  rightLegMaterial.color.set(color)
  leftLegMaterial.color.set(color)
})

// Overlay handlers
headOverlayEnabled?.addEventListener('change', (e) => {
  const enabled = (e.target as HTMLInputElement).checked
  sceneManager.getHeadOverlayMesh().visible = enabled
  headOverlayColor.disabled = !enabled
})

headOverlayColor?.addEventListener('input', (e) => {
  const color = (e.target as HTMLInputElement).value
  const material = sceneManager.getHeadOverlayMesh().material as THREE.MeshLambertMaterial
  material.color.set(color)
})

bodyOverlayEnabled?.addEventListener('change', (e) => {
  const enabled = (e.target as HTMLInputElement).checked
  sceneManager.getBodyOverlayMesh().visible = enabled
  bodyOverlayColor.disabled = !enabled
})

bodyOverlayColor?.addEventListener('input', (e) => {
  const color = (e.target as HTMLInputElement).value
  const material = sceneManager.getBodyOverlayMesh().material as THREE.MeshLambertMaterial
  material.color.set(color)
})

armsOverlayEnabled?.addEventListener('change', (e) => {
  const enabled = (e.target as HTMLInputElement).checked
  sceneManager.getRightArmOverlayMesh().visible = enabled
  sceneManager.getLeftArmOverlayMesh().visible = enabled
  armsOverlayColor.disabled = !enabled
})

armsOverlayColor?.addEventListener('input', (e) => {
  const color = (e.target as HTMLInputElement).value
  const rightArmMaterial = sceneManager.getRightArmOverlayMesh().material as THREE.MeshLambertMaterial
  const leftArmMaterial = sceneManager.getLeftArmOverlayMesh().material as THREE.MeshLambertMaterial
  rightArmMaterial.color.set(color)
  leftArmMaterial.color.set(color)
})

legsOverlayEnabled?.addEventListener('change', (e) => {
  const enabled = (e.target as HTMLInputElement).checked
  sceneManager.getRightLegOverlayMesh().visible = enabled
  sceneManager.getLeftLegOverlayMesh().visible = enabled
  legsOverlayColor.disabled = !enabled
})

legsOverlayColor?.addEventListener('input', (e) => {
  const color = (e.target as HTMLInputElement).value
  const rightLegMaterial = sceneManager.getRightLegOverlayMesh().material as THREE.MeshLambertMaterial
  const leftLegMaterial = sceneManager.getLeftLegOverlayMesh().material as THREE.MeshLambertMaterial
  rightLegMaterial.color.set(color)
  leftLegMaterial.color.set(color)
})

// Preset handlers
function applyPreset(head: string, body: string, arms: string, legs: string) {
  headColorPicker.value = head
  bodyColorPicker.value = body
  armsColorPicker.value = arms
  legsColorPicker.value = legs

  const headMaterial = sceneManager.getHeadMesh().material as THREE.MeshLambertMaterial
  const bodyMaterial = sceneManager.getBodyMesh().material as THREE.MeshLambertMaterial
  const rightArmMaterial = sceneManager.getRightArmMesh().material as THREE.MeshLambertMaterial
  const leftArmMaterial = sceneManager.getLeftArmMesh().material as THREE.MeshLambertMaterial
  const rightLegMaterial = sceneManager.getRightLegMesh().material as THREE.MeshLambertMaterial
  const leftLegMaterial = sceneManager.getLeftLegMesh().material as THREE.MeshLambertMaterial

  headMaterial.color.set(head)
  bodyMaterial.color.set(body)
  rightArmMaterial.color.set(arms)
  leftArmMaterial.color.set(arms)
  rightLegMaterial.color.set(legs)
  leftLegMaterial.color.set(legs)
}

presetSteve?.addEventListener('click', () => {
  applyPreset('#ffdbac', '#4a90e2', '#ffdbac', '#2c5aa0')
})

presetAlex?.addEventListener('click', () => {
  applyPreset('#f4c8a0', '#e35d5d', '#f4c8a0', '#6b4e3d')
})

presetZombie?.addEventListener('click', () => {
  applyPreset('#7fa95f', '#4a7c59', '#7fa95f', '#3d5a45')
})

presetEnderman?.addEventListener('click', () => {
  applyPreset('#161616', '#000000', '#161616', '#000000')
})

// Skin export function - Minecraft 1.8+ format (64x64 with overlay layers)
function generateSkinTexture(): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  canvas.width = 64
  canvas.height = 64
  const ctx = canvas.getContext('2d')!

  // Get colors from materials
  const headMaterial = sceneManager.getHeadMesh().material as THREE.MeshLambertMaterial
  const bodyMaterial = sceneManager.getBodyMesh().material as THREE.MeshLambertMaterial
  const armMaterial = sceneManager.getRightArmMesh().material as THREE.MeshLambertMaterial
  const legMaterial = sceneManager.getRightLegMesh().material as THREE.MeshLambertMaterial

  const headColor = `#${headMaterial.color.getHexString()}`
  const bodyColor = `#${bodyMaterial.color.getHexString()}`
  const armColor = `#${armMaterial.color.getHexString()}`
  const legColor = `#${legMaterial.color.getHexString()}`

  // Fill with transparent background
  ctx.clearRect(0, 0, 64, 64)

  // ============================================
  // BASE LAYER (Left half - pixels 0-31)
  // ============================================

  // HEAD - Base Layer (8x8x8)
  ctx.fillStyle = headColor
  // Top
  ctx.fillRect(8, 0, 8, 8)
  // Bottom
  ctx.fillRect(16, 0, 8, 8)
  // Right
  ctx.fillRect(0, 8, 8, 8)
  // Front
  ctx.fillRect(8, 8, 8, 8)
  // Left
  ctx.fillRect(16, 8, 8, 8)
  // Back
  ctx.fillRect(24, 8, 8, 8)

  // RIGHT LEG - Base Layer (4x12x4)
  ctx.fillStyle = legColor
  // Top
  ctx.fillRect(4, 16, 4, 4)
  // Bottom
  ctx.fillRect(8, 16, 4, 4)
  // Right
  ctx.fillRect(0, 20, 4, 12)
  // Front
  ctx.fillRect(4, 20, 4, 12)
  // Left
  ctx.fillRect(8, 20, 4, 12)
  // Back
  ctx.fillRect(12, 20, 4, 12)

  // BODY - Base Layer (8x12x4)
  ctx.fillStyle = bodyColor
  // Top
  ctx.fillRect(20, 16, 8, 4)
  // Bottom
  ctx.fillRect(28, 16, 8, 4)
  // Right
  ctx.fillRect(16, 20, 4, 12)
  // Front
  ctx.fillRect(20, 20, 8, 12)
  // Left
  ctx.fillRect(28, 20, 4, 12)
  // Back
  ctx.fillRect(32, 20, 8, 12)

  // RIGHT ARM - Base Layer (4x12x4)
  ctx.fillStyle = armColor
  // Top
  ctx.fillRect(44, 16, 4, 4)
  // Bottom
  ctx.fillRect(48, 16, 4, 4)
  // Right
  ctx.fillRect(40, 20, 4, 12)
  // Front
  ctx.fillRect(44, 20, 4, 12)
  // Left
  ctx.fillRect(48, 20, 4, 12)
  // Back
  ctx.fillRect(52, 20, 4, 12)

  // ============================================
  // SECOND LAYER - OVERLAY (Right half - pixels 32-63)
  // ============================================

  // HEAD - Outer Layer (Hat/Helmet overlay)
  if (headOverlayEnabled.checked) {
    const headOverlayMaterial = sceneManager.getHeadOverlayMesh().material as THREE.MeshLambertMaterial
    const headOverlayColorStr = `#${headOverlayMaterial.color.getHexString()}`
    ctx.fillStyle = headOverlayColorStr
    ctx.globalAlpha = 1.0
  } else {
    ctx.globalAlpha = 0.0 // Transparent overlay
  }
  // Top
  ctx.fillRect(40, 0, 8, 8)
  // Bottom
  ctx.fillRect(48, 0, 8, 8)
  // Right
  ctx.fillRect(32, 8, 8, 8)
  // Front
  ctx.fillRect(40, 8, 8, 8)
  // Left
  ctx.fillRect(48, 8, 8, 8)
  // Back
  ctx.fillRect(56, 8, 8, 8)
  ctx.globalAlpha = 1.0

  // LEFT LEG - Base Layer (4x12x4)
  ctx.fillStyle = legColor
  // Top
  ctx.fillRect(20, 48, 4, 4)
  // Bottom
  ctx.fillRect(24, 48, 4, 4)
  // Right
  ctx.fillRect(16, 52, 4, 12)
  // Front
  ctx.fillRect(20, 52, 4, 12)
  // Left
  ctx.fillRect(24, 52, 4, 12)
  // Back
  ctx.fillRect(28, 52, 4, 12)

  // LEFT ARM - Base Layer (4x12x4)
  ctx.fillStyle = armColor
  // Top
  ctx.fillRect(36, 48, 4, 4)
  // Bottom
  ctx.fillRect(40, 48, 4, 4)
  // Right
  ctx.fillRect(32, 52, 4, 12)
  // Front
  ctx.fillRect(36, 52, 4, 12)
  // Left
  ctx.fillRect(40, 52, 4, 12)
  // Back
  ctx.fillRect(44, 52, 4, 12)

  // BODY - Outer Layer (jacket overlay)
  if (bodyOverlayEnabled.checked) {
    const bodyOverlayMaterial = sceneManager.getBodyOverlayMesh().material as THREE.MeshLambertMaterial
    const bodyOverlayColorStr = `#${bodyOverlayMaterial.color.getHexString()}`
    ctx.fillStyle = bodyOverlayColorStr
    ctx.globalAlpha = 1.0
  } else {
    ctx.globalAlpha = 0.0
  }
  // Top
  ctx.fillRect(20, 32, 8, 4)
  // Bottom
  ctx.fillRect(28, 32, 8, 4)
  // Right
  ctx.fillRect(16, 36, 4, 12)
  // Front
  ctx.fillRect(20, 36, 8, 12)
  // Left
  ctx.fillRect(28, 36, 4, 12)
  // Back
  ctx.fillRect(32, 36, 8, 12)
  ctx.globalAlpha = 1.0

  // RIGHT ARM - Outer Layer (sleeve overlay)
  if (armsOverlayEnabled.checked) {
    const armsOverlayMaterial = sceneManager.getRightArmOverlayMesh().material as THREE.MeshLambertMaterial
    const armsOverlayColorStr = `#${armsOverlayMaterial.color.getHexString()}`
    ctx.fillStyle = armsOverlayColorStr
    ctx.globalAlpha = 1.0
  } else {
    ctx.globalAlpha = 0.0
  }
  // Top
  ctx.fillRect(44, 32, 4, 4)
  // Bottom
  ctx.fillRect(48, 32, 4, 4)
  // Right
  ctx.fillRect(40, 36, 4, 12)
  // Front
  ctx.fillRect(44, 36, 4, 12)
  // Left
  ctx.fillRect(48, 36, 4, 12)
  // Back
  ctx.fillRect(52, 36, 4, 12)
  ctx.globalAlpha = 1.0

  // LEFT LEG - Outer Layer (pants overlay)
  if (legsOverlayEnabled.checked) {
    const legsOverlayMaterial = sceneManager.getRightLegOverlayMesh().material as THREE.MeshLambertMaterial
    const legsOverlayColorStr = `#${legsOverlayMaterial.color.getHexString()}`
    ctx.fillStyle = legsOverlayColorStr
    ctx.globalAlpha = 1.0
  } else {
    ctx.globalAlpha = 0.0
  }
  // Top
  ctx.fillRect(4, 48, 4, 4)
  // Bottom
  ctx.fillRect(8, 48, 4, 4)
  // Right
  ctx.fillRect(0, 52, 4, 12)
  // Front
  ctx.fillRect(4, 52, 4, 12)
  // Left
  ctx.fillRect(8, 52, 4, 12)
  // Back
  ctx.fillRect(12, 52, 4, 12)
  ctx.globalAlpha = 1.0

  // LEFT ARM - Outer Layer (sleeve overlay)
  if (armsOverlayEnabled.checked) {
    const armsOverlayMaterial = sceneManager.getLeftArmOverlayMesh().material as THREE.MeshLambertMaterial
    const armsOverlayColorStr = `#${armsOverlayMaterial.color.getHexString()}`
    ctx.fillStyle = armsOverlayColorStr
    ctx.globalAlpha = 1.0
  } else {
    ctx.globalAlpha = 0.0
  }
  // Top
  ctx.fillRect(52, 48, 4, 4)
  // Bottom
  ctx.fillRect(56, 48, 4, 4)
  // Right
  ctx.fillRect(48, 52, 4, 12)
  // Front
  ctx.fillRect(52, 52, 4, 12)
  // Left
  ctx.fillRect(56, 52, 4, 12)
  // Back
  ctx.fillRect(60, 52, 4, 12)
  ctx.globalAlpha = 1.0

  return canvas
}

downloadSkinButton?.addEventListener('click', () => {
  const canvas = generateSkinTexture()

  // Convert canvas to blob and download
  canvas.toBlob((blob) => {
    if (blob) {
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.download = 'minecraft-skin.png'
      link.href = url
      link.click()
      URL.revokeObjectURL(url)
    }
  }, 'image/png')
})

// Animation controls
walkAnimationCheckbox?.addEventListener('change', (e) => {
  walkAnimation = (e.target as HTMLInputElement).checked
  if (!walkAnimation) {
    // Reset to neutral pose
    sceneManager.getRightArmMesh().rotation.x = 0
    sceneManager.getLeftArmMesh().rotation.x = 0
    sceneManager.getRightLegMesh().rotation.x = 0
    sceneManager.getLeftLegMesh().rotation.x = 0
  }
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

    const rightArmMesh = sceneManager.getRightArmMesh()
    const leftArmMesh = sceneManager.getLeftArmMesh()
    const rightLegMesh = sceneManager.getRightLegMesh()
    const leftLegMesh = sceneManager.getLeftLegMesh()

    // Overlay meshes
    const rightArmOverlay = sceneManager.getRightArmOverlayMesh()
    const leftArmOverlay = sceneManager.getLeftArmOverlayMesh()
    const rightLegOverlay = sceneManager.getRightLegOverlayMesh()
    const leftLegOverlay = sceneManager.getLeftLegOverlayMesh()

    // Swing arms and legs (opposite motion)
    const swing = Math.sin(animationTime) * 0.5
    rightArmMesh.rotation.x = swing
    leftArmMesh.rotation.x = -swing
    rightLegMesh.rotation.x = -swing
    leftLegMesh.rotation.x = swing

    // Sync overlay rotations
    rightArmOverlay.rotation.x = swing
    leftArmOverlay.rotation.x = -swing
    rightLegOverlay.rotation.x = -swing
    leftLegOverlay.rotation.x = swing
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
