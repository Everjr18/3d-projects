import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { StarfieldComponent } from '../base/StarfieldComponent'
import { ModelLoaderComponent } from '../base/ModelLoaderComponent'
import createCamera from '../scene/createCamera'
import createRenderer from '../scene/createRenderer'
import { SIDEBAR_WIDTH, CELESTIAL_OBJECTS, LIGHTS, CONTROLS } from '../../config'

export class Objects3DManager {
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

      // Load skull model
      const skullComponent = new ModelLoaderComponent()
      skullComponent.load({
        objPath: CELESTIAL_OBJECTS.SKULL.model.obj,
        mtlPath: CELESTIAL_OBJECTS.SKULL.model.mtl,
        position: { x: 0, y: 0, z: 0 }, // Center it in this scene
        scale: CELESTIAL_OBJECTS.SKULL.scale,
        rotation: CELESTIAL_OBJECTS.SKULL.rotation,
        meshName: CELESTIAL_OBJECTS.SKULL.name,
      }).then(() => {
        skullComponent.addToScene(m_scene)

        const skullLight = new THREE.PointLight(
          CELESTIAL_OBJECTS.SKULL.light.color,
          CELESTIAL_OBJECTS.SKULL.light.intensity,
          CELESTIAL_OBJECTS.SKULL.light.distance
        )
        skullLight.position.set(0, 2, 0) // Position light above the skull
        m_scene.add(skullLight)
      }).catch((error) => {
        console.error('Error loading skull:', error)
      })

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
