import * as THREE from 'three'

interface UIElements {
  renderer: THREE.WebGLRenderer
  camera: THREE.PerspectiveCamera
  cloudsMesh?: THREE.Mesh
  sunLight: THREE.DirectionalLight
  ambientLight: THREE.AmbientLight
}

export class UIController {
  constructor(elements: UIElements) {
    let m_rotationSpeed = 1.0
    let m_starsSpeed = 1.0
    let m_autoRotateCamera = true

    this.setup = setup
    this.getRotationSpeed = () => m_rotationSpeed
    this.getStarsSpeed = () => m_starsSpeed
    this.getAutoRotateCamera = () => m_autoRotateCamera
    this.setRotationSpeed = (speed: number) => { m_rotationSpeed = speed }
    this.setStarsSpeed = (speed: number) => { m_starsSpeed = speed }
    this.setAutoRotateCamera = (value: boolean) => { m_autoRotateCamera = value }

    function setup() {
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
        const brightness = parseFloat(target.value)
        if (brightnessValue) brightnessValue.textContent = brightness.toFixed(1)
        elements.renderer.toneMappingExposure = brightness
      })

      speedSlider?.addEventListener('input', (e) => {
        const target = e.target as HTMLInputElement
        m_rotationSpeed = parseFloat(target.value)
        if (speedValue) speedValue.textContent = m_rotationSpeed.toFixed(1) + 'x'
      })

      fovSlider?.addEventListener('input', (e) => {
        const target = e.target as HTMLInputElement
        const fov = parseFloat(target.value)
        if (fovValue) fovValue.textContent = fov + '°'
        elements.camera.fov = fov
        elements.camera.updateProjectionMatrix()
      })

      ambientSlider?.addEventListener('input', (e) => {
        const target = e.target as HTMLInputElement
        const intensity = parseFloat(target.value)
        if (ambientValue) ambientValue.textContent = intensity.toFixed(2)
        elements.ambientLight.intensity = intensity
      })

      directionalSlider?.addEventListener('input', (e) => {
        const target = e.target as HTMLInputElement
        const intensity = parseFloat(target.value)
        if (directionalValue) directionalValue.textContent = intensity.toFixed(1)
        elements.sunLight.intensity = intensity
      })

      cloudsSlider?.addEventListener('input', (e) => {
        const target = e.target as HTMLInputElement
        const opacity = parseFloat(target.value)
        if (cloudsValue) cloudsValue.textContent = opacity.toFixed(2)
        if (elements.cloudsMesh && elements.cloudsMesh.material instanceof THREE.Material) {
          elements.cloudsMesh.material.opacity = opacity
        }
      })

      starsSlider?.addEventListener('input', (e) => {
        const target = e.target as HTMLInputElement
        m_starsSpeed = parseFloat(target.value)
        if (starsValue) starsValue.textContent = m_starsSpeed.toFixed(1) + 'x'
      })

      autoRotateCheckbox?.addEventListener('change', (e) => {
        const target = e.target as HTMLInputElement
        m_autoRotateCamera = target.checked
      })
    }
  }

  setup!: () => void
  getRotationSpeed!: () => number
  getStarsSpeed!: () => number
  getAutoRotateCamera!: () => boolean
  setRotationSpeed!: (speed: number) => void
  setStarsSpeed!: (speed: number) => void
  setAutoRotateCamera!: (value: boolean) => void
}
