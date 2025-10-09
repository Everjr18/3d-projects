import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { StarfieldComponent } from '../base/StarfieldComponent'
import { createCube } from '../primitives/createCube'
import { createCylinder } from '../primitives/createCylinder'
import createCamera from '../scene/createCamera'
import createRenderer from '../scene/createRenderer'
import { SIDEBAR_WIDTH, CELESTIAL_OBJECTS, LIGHTS, CONTROLS } from '../../config'

export class PrimitivesManager {
  constructor() {
    const m_scene = new THREE.Scene()
    const m_camera = createCamera()
    const m_renderer = createRenderer()
    const m_control = new OrbitControls(m_camera, m_renderer.domElement)

    let m_sunLight: THREE.DirectionalLight
    let m_ambientLight: THREE.AmbientLight
    let m_starfield: THREE.Points

    this.setup = setup
    this.getScene = () => m_scene
    this.getCamera = () => m_camera
    this.getRenderer = () => m_renderer
    this.getControls = () => m_control
    this.getSunLight = () => m_sunLight
    this.getAmbientLight = () => m_ambientLight
    this.getStarfield = () => m_starfield
    this.handleResize = handleResize

    function setup() {
      const canvasContainer = document.getElementById('canvas-container')
      if (canvasContainer) {
        canvasContainer.appendChild(m_renderer.domElement)
      }

      m_control.enableDamping = CONTROLS.enableDamping
      m_control.dampingFactor = CONTROLS.dampingFactor
      m_control.autoRotate = CONTROLS.autoRotate
      m_control.autoRotateSpeed = CONTROLS.autoRotateSpeed

      m_sunLight = new THREE.DirectionalLight(LIGHTS.DIRECTIONAL.color, LIGHTS.DIRECTIONAL.intensity)
      m_sunLight.position.set(LIGHTS.DIRECTIONAL.position.x, LIGHTS.DIRECTIONAL.position.y, LIGHTS.DIRECTIONAL.position.z)
      m_scene.add(m_sunLight)

      m_ambientLight = new THREE.AmbientLight(LIGHTS.AMBIENT.color, LIGHTS.AMBIENT.intensity)
      m_ambientLight.position.set(LIGHTS.AMBIENT.position.x, LIGHTS.AMBIENT.position.y, LIGHTS.AMBIENT.position.z)
      m_scene.add(m_ambientLight)

      const starfieldComponent = new StarfieldComponent({
        numStars: CELESTIAL_OBJECTS.STARFIELD.numStars,
        radiusMin: CELESTIAL_OBJECTS.STARFIELD.radius.min,
        radiusMax: CELESTIAL_OBJECTS.STARFIELD.radius.max,
        size: CELESTIAL_OBJECTS.STARFIELD.size,
        hue: CELESTIAL_OBJECTS.STARFIELD.hue,
        saturation: CELESTIAL_OBJECTS.STARFIELD.saturation,
        textureUrl: CELESTIAL_OBJECTS.STARFIELD.texture,
      })
      m_starfield = starfieldComponent.getPoints()
      m_scene.add(m_starfield)

      // Crear cubo
      const cubeComponent = createCube(
        CELESTIAL_OBJECTS.CUBE.scale,
        CELESTIAL_OBJECTS.CUBE.color,
        false
      )
      cubeComponent.setName(CELESTIAL_OBJECTS.CUBE.name)
      cubeComponent.setPosition(
        CELESTIAL_OBJECTS.CUBE.position.x,
        CELESTIAL_OBJECTS.CUBE.position.y,
        CELESTIAL_OBJECTS.CUBE.position.z
      )
      cubeComponent.addToScene(m_scene)

      // Crear cilindro
      const cylinderComponent = createCylinder(
        CELESTIAL_OBJECTS.CYLINDER.radiusTop,
        CELESTIAL_OBJECTS.CYLINDER.radiusBottom,
        CELESTIAL_OBJECTS.CYLINDER.height,
        CELESTIAL_OBJECTS.CYLINDER.color,
        false
      )
      cylinderComponent.setName(CELESTIAL_OBJECTS.CYLINDER.name)
      cylinderComponent.setPosition(
        CELESTIAL_OBJECTS.CYLINDER.position.x,
        CELESTIAL_OBJECTS.CYLINDER.position.y,
        CELESTIAL_OBJECTS.CYLINDER.position.z
      )
      cylinderComponent.addToScene(m_scene)

      window.addEventListener('resize', handleResize, false)
    }

    function handleResize() {
      const sidebarWidth = window.innerWidth > 768 ? SIDEBAR_WIDTH : 0
      const w = window.innerWidth - sidebarWidth
      m_camera.aspect = w / window.innerHeight
      m_camera.updateProjectionMatrix()
      m_renderer.setSize(w, window.innerHeight)
    }
  }

  setup!: () => void
  getScene!: () => THREE.Scene
  getCamera!: () => THREE.PerspectiveCamera
  getRenderer!: () => THREE.WebGLRenderer
  getControls!: () => OrbitControls
  getSunLight!: () => THREE.DirectionalLight
  getAmbientLight!: () => THREE.AmbientLight
  getStarfield!: () => THREE.Points
  handleResize!: () => void
}
