import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import createStarfield from '../../src/components/createStarfield'
import createMoon from '../../src/components/createMoon'
import createSun from '../../src/components/createSun'
import createCamera from '../../src/components/createCamera'
import createRenderer from '../../src/components/createRenderer'
import createSatellite from '../../src/components/createSatellite'
import createEarth from '../../src/components/createEarth'
import createLights from '../../src/components/createLights'
import checkIntersection from '../../src/components/checkIntersection'
import PreviewScene from '../../src/components/createPreviewScene'

// Configuration
const renderer = createRenderer()
const camera = createCamera()
const scene = new THREE.Scene()
const canvasContainer = document.getElementById('canvas-container')
if (canvasContainer) {
  canvasContainer.appendChild(renderer.domElement)
}
const control = new OrbitControls(camera, renderer.domElement)
control.enableDamping = true
control.dampingFactor = 0.03
control.autoRotate = true
control.autoRotateSpeed = 0.5

// Create lights (we'll store references for controls)
const sunLight = new THREE.DirectionalLight(0xffffff, 2.0)
sunLight.position.set(-2, 0.5, 1.5)
scene.add(sunLight)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
ambientLight.position.set(0, 1, 0)
scene.add(ambientLight)

// Create Solar System  //
const starts = createStarfield({ numStars: 2000 })
scene.add(starts)
const earthGroup = new THREE.Group()
// const axesHelper = new THREE.AxesHelper(5)
// earthGroup.add(axesHelper)
const sun = createSun(scene)
scene.add(sun)
const { earthMesh, lightMesh, cloudsMesh, glowMesh } = createEarth(earthGroup)
scene.add(earthGroup)
createSatellite(scene)
const moonGroup = createMoon(scene)
earthGroup.add(moonGroup)

// Setup preview scene (delay to ensure canvas has dimensions)
let previewScene: PreviewScene | null = null
const previewCanvas = document.getElementById('preview-canvas') as HTMLCanvasElement
if (previewCanvas) {
  setTimeout(() => {
    previewScene = new PreviewScene(previewCanvas)
  }, 100)
}

// Controls variables
let rotationSpeed = 1.0
let brightnessMultiplier = 1.0
let starsSpeed = 1.0
let autoRotateCamera = true

// Configurar raycaster
const raycaster = new THREE.Raycaster()
window.addEventListener(
  'click',
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  (event: any) => {
    checkIntersection(event.clientX, event.clientY, raycaster, camera, scene, control, previewScene)
  },
  false,
)

// Animation
function animate() {
  const baseSpeed = 0.0115
  const speed = baseSpeed * rotationSpeed
  requestAnimationFrame(animate)
  earthMesh.rotation.y += speed
  lightMesh.rotation.y += speed
  cloudsMesh.rotation.y += speed + 0.002 * rotationSpeed
  glowMesh.rotation.y += speed
  starts.rotation.y -= (speed / 30) * starsSpeed
  earthGroup.rotateOnAxis(earthGroup.up, speed / 27)
  control.autoRotate = autoRotateCamera
  control.update()
  renderer.render(scene, camera)
}

animate()

function handleWindowResize() {
  const w = window.innerWidth - 400 // Sidebar width
  camera.aspect = w / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(w, window.innerHeight)
}

window.addEventListener('resize', handleWindowResize, false)

// Controls UI
const brightnessSlider = document.getElementById('brightness-slider') as HTMLInputElement
const brightnessValue = document.getElementById('brightness-value')
const speedSlider = document.getElementById('speed-slider') as HTMLInputElement
const speedValue = document.getElementById('speed-value')
const fovSlider = document.getElementById('fov-slider') as HTMLInputElement
const fovValue = document.getElementById('fov-value')
const ambientSlider = document.getElementById('ambient-slider') as HTMLInputElement
const ambientValue = document.getElementById('ambient-value')
const directionalSlider = document.getElementById('directional-slider') as HTMLInputElement
const directionalValue = document.getElementById('directional-value')
const cloudsSlider = document.getElementById('clouds-slider') as HTMLInputElement
const cloudsValue = document.getElementById('clouds-value')
const starsSlider = document.getElementById('stars-slider') as HTMLInputElement
const starsValue = document.getElementById('stars-value')
const autoRotateCheckbox = document.getElementById('auto-rotate-checkbox') as HTMLInputElement

brightnessSlider?.addEventListener('input', (e) => {
  const target = e.target as HTMLInputElement
  brightnessMultiplier = parseFloat(target.value)
  if (brightnessValue) brightnessValue.textContent = brightnessMultiplier.toFixed(1)
  renderer.toneMappingExposure = brightnessMultiplier
})

speedSlider?.addEventListener('input', (e) => {
  const target = e.target as HTMLInputElement
  rotationSpeed = parseFloat(target.value)
  if (speedValue) speedValue.textContent = rotationSpeed.toFixed(1) + 'x'
})

fovSlider?.addEventListener('input', (e) => {
  const target = e.target as HTMLInputElement
  const fov = parseFloat(target.value)
  if (fovValue) fovValue.textContent = fov + '°'
  camera.fov = fov
  camera.updateProjectionMatrix()
})

ambientSlider?.addEventListener('input', (e) => {
  const target = e.target as HTMLInputElement
  const intensity = parseFloat(target.value)
  if (ambientValue) ambientValue.textContent = intensity.toFixed(2)
  ambientLight.intensity = intensity
})

directionalSlider?.addEventListener('input', (e) => {
  const target = e.target as HTMLInputElement
  const intensity = parseFloat(target.value)
  if (directionalValue) directionalValue.textContent = intensity.toFixed(1)
  sunLight.intensity = intensity
})

cloudsSlider?.addEventListener('input', (e) => {
  const target = e.target as HTMLInputElement
  const opacity = parseFloat(target.value)
  if (cloudsValue) cloudsValue.textContent = opacity.toFixed(2)
  if (cloudsMesh.material instanceof THREE.Material) {
    cloudsMesh.material.opacity = opacity
  }
})

starsSlider?.addEventListener('input', (e) => {
  const target = e.target as HTMLInputElement
  starsSpeed = parseFloat(target.value)
  if (starsValue) starsValue.textContent = starsSpeed.toFixed(1) + 'x'
})

autoRotateCheckbox?.addEventListener('change', (e) => {
  const target = e.target as HTMLInputElement
  autoRotateCamera = target.checked
})
