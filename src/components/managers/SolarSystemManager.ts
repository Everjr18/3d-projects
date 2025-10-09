import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { MeshComponent } from '../base/MeshComponent'
import { LayeredMeshComponent } from '../base/LayeredMeshComponent'
import { ModelLoaderComponent } from '../base/ModelLoaderComponent'
import { StarfieldComponent } from '../base/StarfieldComponent'
import { getSunMaterial } from '../../shaders/getSunMaterial'
import { getFresnelMat } from '../../shaders/getFresnelMat'
import createCamera from '../scene/createCamera'
import createRenderer from '../scene/createRenderer'
import { SIDEBAR_WIDTH, CELESTIAL_OBJECTS, LIGHTS, CONTROLS, GEOMETRY } from '../../config'

export class SolarSystemManager {
  constructor() {
    const m_scene = new THREE.Scene()
    const m_camera = createCamera()
    const m_renderer = createRenderer()
    const m_control = new OrbitControls(m_camera, m_renderer.domElement)

    let m_sunLight: THREE.DirectionalLight
    let m_ambientLight: THREE.AmbientLight
    let m_starfield: THREE.Points
    let m_earthGroup: THREE.Group
    let m_earthMesh: THREE.Mesh
    let m_lightMesh: THREE.Mesh
    let m_cloudsMesh: THREE.Mesh
    let m_glowMesh: THREE.Mesh

    this.setup = setup
    this.getScene = () => m_scene
    this.getCamera = () => m_camera
    this.getRenderer = () => m_renderer
    this.getControls = () => m_control
    this.getSunLight = () => m_sunLight
    this.getAmbientLight = () => m_ambientLight
    this.getStarfield = () => m_starfield
    this.getEarthGroup = () => m_earthGroup
    this.getEarthMesh = () => m_earthMesh
    this.getLightMesh = () => m_lightMesh
    this.getCloudsMesh = () => m_cloudsMesh
    this.getGlowMesh = () => m_glowMesh
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

      const sunGeometry = new THREE.IcosahedronGeometry(GEOMETRY.SPHERE.radius, GEOMETRY.SPHERE.detail)
      const sunMaterial = getSunMaterial(CELESTIAL_OBJECTS.SUN.shader)
      const sunComponent = new MeshComponent(sunGeometry, sunMaterial)
      sunComponent.setName(CELESTIAL_OBJECTS.SUN.name)
      sunComponent.setPosition(CELESTIAL_OBJECTS.SUN.position.x, CELESTIAL_OBJECTS.SUN.position.y, CELESTIAL_OBJECTS.SUN.position.z)
      sunComponent.setScale(CELESTIAL_OBJECTS.SUN.scale)
      sunComponent.addToScene(m_scene)

      m_earthGroup = new THREE.Group()
      const earthComponent = new LayeredMeshComponent('earthGroup')
      const earthGeometry = new THREE.IcosahedronGeometry(GEOMETRY.SPHERE.radius, GEOMETRY.SPHERE.detail)
      const loader = new THREE.TextureLoader()

      const earthMaterial = new THREE.MeshPhongMaterial({
        map: loader.load(CELESTIAL_OBJECTS.EARTH.layers.surface.textures.map),
        specularMap: loader.load(CELESTIAL_OBJECTS.EARTH.layers.surface.textures.specularMap),
        bumpMap: loader.load(CELESTIAL_OBJECTS.EARTH.layers.surface.textures.bumpMap),
        bumpScale: CELESTIAL_OBJECTS.EARTH.layers.surface.bumpScale,
      })
      m_earthMesh = new THREE.Mesh(earthGeometry, earthMaterial)

      const lightsMaterial = new THREE.MeshBasicMaterial({
        map: loader.load(CELESTIAL_OBJECTS.EARTH.layers.lights.texture),
        blending: THREE.AdditiveBlending,
      })
      m_lightMesh = new THREE.Mesh(earthGeometry, lightsMaterial)

      const cloudsMaterial = new THREE.MeshStandardMaterial({
        map: loader.load(CELESTIAL_OBJECTS.EARTH.layers.clouds.textures.map),
        blending: THREE.AdditiveBlending,
        alphaMap: loader.load(CELESTIAL_OBJECTS.EARTH.layers.clouds.textures.alphaMap),
      })
      m_cloudsMesh = new THREE.Mesh(earthGeometry, cloudsMaterial)

      const fresnelMaterial = getFresnelMat(CELESTIAL_OBJECTS.EARTH.layers.glow.fresnel)
      m_glowMesh = new THREE.Mesh(earthGeometry, fresnelMaterial)

      earthComponent.addLayer({ name: CELESTIAL_OBJECTS.EARTH.layers.surface.name, mesh: m_earthMesh, scale: CELESTIAL_OBJECTS.EARTH.layers.surface.scale })
      earthComponent.addLayer({ name: CELESTIAL_OBJECTS.EARTH.layers.lights.name, mesh: m_lightMesh, scale: CELESTIAL_OBJECTS.EARTH.layers.lights.scale })
      earthComponent.addLayer({ name: CELESTIAL_OBJECTS.EARTH.layers.clouds.name, mesh: m_cloudsMesh, scale: CELESTIAL_OBJECTS.EARTH.layers.clouds.scale })
      earthComponent.addLayer({ name: CELESTIAL_OBJECTS.EARTH.layers.glow.name, mesh: m_glowMesh, scale: CELESTIAL_OBJECTS.EARTH.layers.glow.scale })

      m_earthGroup.add(earthComponent.getObject3D())
      m_scene.add(m_earthGroup)

      const satelliteComponent = new ModelLoaderComponent()
      satelliteComponent.load({
        objPath: CELESTIAL_OBJECTS.SATELLITE.model.obj,
        mtlPath: CELESTIAL_OBJECTS.SATELLITE.model.mtl,
        position: CELESTIAL_OBJECTS.SATELLITE.position,
        scale: CELESTIAL_OBJECTS.SATELLITE.scale,
        rotation: CELESTIAL_OBJECTS.SATELLITE.rotation,
        meshName: CELESTIAL_OBJECTS.SATELLITE.name,
      }).then(() => {
        satelliteComponent.addToScene(m_scene)
      }).catch((error) => {
        console.error('Error loading satellite:', error)
      })

      const moonGeometry = new THREE.IcosahedronGeometry(GEOMETRY.SPHERE.radius, GEOMETRY.SPHERE.detail)
      const moonMaterial = new THREE.MeshPhongMaterial({
        map: loader.load(CELESTIAL_OBJECTS.MOON.textures.map),
        bumpMap: loader.load(CELESTIAL_OBJECTS.MOON.textures.bumpMap),
        bumpScale: CELESTIAL_OBJECTS.MOON.bumpScale,
      })
      const moonComponent = new MeshComponent(moonGeometry, moonMaterial)
      moonComponent.setName(CELESTIAL_OBJECTS.MOON.name)
      moonComponent.setPosition(CELESTIAL_OBJECTS.MOON.position.x, CELESTIAL_OBJECTS.MOON.position.y, CELESTIAL_OBJECTS.MOON.position.z)
      moonComponent.setScale(CELESTIAL_OBJECTS.MOON.scale)

      m_earthGroup.add(moonComponent.getObject3D())

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
  getEarthGroup!: () => THREE.Group
  getEarthMesh!: () => THREE.Mesh
  getLightMesh!: () => THREE.Mesh
  getCloudsMesh!: () => THREE.Mesh
  getGlowMesh!: () => THREE.Mesh
  handleResize!: () => void
}
