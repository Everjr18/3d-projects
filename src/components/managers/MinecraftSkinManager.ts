import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import createCamera from '../scene/createCamera'
import createRenderer from '../scene/createRenderer'
import { SIDEBAR_WIDTH, LIGHTS, CONTROLS } from '../../config'

export class MinecraftSkinManager {
  constructor() {
    const m_scene = new THREE.Scene()
    const m_camera = createCamera()
    const m_renderer = createRenderer()
    const m_control = new OrbitControls(m_camera, m_renderer.domElement)

    let m_sunLight: THREE.DirectionalLight
    let m_ambientLight: THREE.AmbientLight
    let m_skinModel: THREE.Group
    let m_headMesh: THREE.Mesh
    let m_bodyMesh: THREE.Mesh
    let m_rightArmMesh: THREE.Mesh
    let m_leftArmMesh: THREE.Mesh
    let m_rightLegMesh: THREE.Mesh
    let m_leftLegMesh: THREE.Mesh
    // Overlay layers
    let m_headOverlayMesh: THREE.Mesh
    let m_bodyOverlayMesh: THREE.Mesh
    let m_rightArmOverlayMesh: THREE.Mesh
    let m_leftArmOverlayMesh: THREE.Mesh
    let m_rightLegOverlayMesh: THREE.Mesh
    let m_leftLegOverlayMesh: THREE.Mesh
    // Pivot groups for proper rotation
    let m_rightArmGroup: THREE.Group
    let m_leftArmGroup: THREE.Group
    let m_rightLegGroup: THREE.Group
    let m_leftLegGroup: THREE.Group

    this.setup = setup
    this.getScene = () => m_scene
    this.getCamera = () => m_camera
    this.getRenderer = () => m_renderer
    this.getControls = () => m_control
    this.getSunLight = () => m_sunLight
    this.getAmbientLight = () => m_ambientLight
    this.getSkinModel = () => m_skinModel
    this.getHeadMesh = () => m_headMesh
    this.getBodyMesh = () => m_bodyMesh
    this.getRightArmMesh = () => m_rightArmMesh
    this.getLeftArmMesh = () => m_leftArmMesh
    this.getRightLegMesh = () => m_rightLegMesh
    this.getLeftLegMesh = () => m_leftLegMesh
    this.getHeadOverlayMesh = () => m_headOverlayMesh
    this.getBodyOverlayMesh = () => m_bodyOverlayMesh
    this.getRightArmOverlayMesh = () => m_rightArmOverlayMesh
    this.getLeftArmOverlayMesh = () => m_leftArmOverlayMesh
    this.getRightLegOverlayMesh = () => m_rightLegOverlayMesh
    this.getLeftLegOverlayMesh = () => m_leftLegOverlayMesh
    this.getRightArmGroup = () => m_rightArmGroup
    this.getLeftArmGroup = () => m_leftArmGroup
    this.getRightLegGroup = () => m_rightLegGroup
    this.getLeftLegGroup = () => m_leftLegGroup
    this.handleResize = handleResize

    function setup() {
      const canvasContainer = document.getElementById('canvas-container')
      if (canvasContainer) {
        canvasContainer.appendChild(m_renderer.domElement)
      }

      // Background
      m_scene.background = new THREE.Color(0x87ceeb)

      // Camera position for character view
      m_camera.position.set(0, 1.5, 5)
      m_camera.lookAt(0, 1, 0)

      m_control.enableDamping = CONTROLS.enableDamping
      m_control.dampingFactor = CONTROLS.dampingFactor
      m_control.autoRotate = CONTROLS.autoRotate
      m_control.autoRotateSpeed = CONTROLS.autoRotateSpeed
      m_control.target.set(0, 1, 0)

      m_sunLight = new THREE.DirectionalLight(LIGHTS.DIRECTIONAL.color, 1.5)
      m_sunLight.position.set(5, 5, 5)
      m_scene.add(m_sunLight)

      m_ambientLight = new THREE.AmbientLight(LIGHTS.AMBIENT.color, 0.5)
      m_scene.add(m_ambientLight)

      // Create Minecraft character model with EXACT proportions
      // Minecraft uses pixels: 1 pixel = 0.125 units in Three.js
      const pixelSize = 0.125

      m_skinModel = new THREE.Group()
      m_skinModel.position.y = 0

      // Head (8x8x8 pixels)
      const headGeometry = new THREE.BoxGeometry(8 * pixelSize, 8 * pixelSize, 8 * pixelSize)
      const headMaterial = new THREE.MeshLambertMaterial({ color: 0xffdbac })
      m_headMesh = new THREE.Mesh(headGeometry, headMaterial)
      m_headMesh.position.y = 28 * pixelSize // 24 (body+legs) + 4 (half head)
      m_headMesh.name = 'head'
      m_skinModel.add(m_headMesh)

      // Body (8x12x4 pixels)
      const bodyGeometry = new THREE.BoxGeometry(8 * pixelSize, 12 * pixelSize, 4 * pixelSize)
      const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0x4a90e2 })
      m_bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial)
      m_bodyMesh.position.y = 18 * pixelSize // 12 (legs) + 6 (half body)
      m_bodyMesh.name = 'body'
      m_skinModel.add(m_bodyMesh)

      // Right Arm (4x12x4 pixels) - with pivot at shoulder
      const armGeometry = new THREE.BoxGeometry(4 * pixelSize, 12 * pixelSize, 4 * pixelSize)
      const armMaterial = new THREE.MeshLambertMaterial({ color: 0xffdbac })
      m_rightArmMesh = new THREE.Mesh(armGeometry, armMaterial)
      m_rightArmMesh.position.y = -6 * pixelSize // Move down half the arm height from pivot
      m_rightArmMesh.name = 'rightArm'

      // Create group for right arm at shoulder position
      m_rightArmGroup = new THREE.Group()
      m_rightArmGroup.position.set(-6 * pixelSize, 24 * pixelSize, 0) // Shoulder position (top of body)
      m_rightArmGroup.add(m_rightArmMesh)
      m_skinModel.add(m_rightArmGroup)

      // Left Arm (4x12x4 pixels) - with pivot at shoulder
      const leftArmMaterial = new THREE.MeshLambertMaterial({ color: 0xffdbac })
      m_leftArmMesh = new THREE.Mesh(armGeometry.clone(), leftArmMaterial)
      m_leftArmMesh.position.y = -6 * pixelSize // Move down half the arm height from pivot
      m_leftArmMesh.name = 'leftArm'

      // Create group for left arm at shoulder position
      m_leftArmGroup = new THREE.Group()
      m_leftArmGroup.position.set(6 * pixelSize, 24 * pixelSize, 0) // Shoulder position (top of body)
      m_leftArmGroup.add(m_leftArmMesh)
      m_skinModel.add(m_leftArmGroup)

      // Right Leg (4x12x4 pixels) - with pivot at hip
      const legGeometry = new THREE.BoxGeometry(4 * pixelSize, 12 * pixelSize, 4 * pixelSize)
      const legMaterial = new THREE.MeshLambertMaterial({ color: 0x2c5aa0 })
      m_rightLegMesh = new THREE.Mesh(legGeometry, legMaterial)
      m_rightLegMesh.position.y = -6 * pixelSize // Move down half the leg height from pivot
      m_rightLegMesh.name = 'rightLeg'

      // Create group for right leg at hip position
      m_rightLegGroup = new THREE.Group()
      m_rightLegGroup.position.set(-2 * pixelSize, 12 * pixelSize, 0) // Hip position (bottom of body)
      m_rightLegGroup.add(m_rightLegMesh)
      m_skinModel.add(m_rightLegGroup)

      // Left Leg (4x12x4 pixels) - with pivot at hip
      const leftLegMaterial = new THREE.MeshLambertMaterial({ color: 0x2c5aa0 })
      m_leftLegMesh = new THREE.Mesh(legGeometry.clone(), leftLegMaterial)
      m_leftLegMesh.position.y = -6 * pixelSize // Move down half the leg height from pivot
      m_leftLegMesh.name = 'leftLeg'

      // Create group for left leg at hip position
      m_leftLegGroup = new THREE.Group()
      m_leftLegGroup.position.set(2 * pixelSize, 12 * pixelSize, 0) // Hip position (bottom of body)
      m_leftLegGroup.add(m_leftLegMesh)
      m_skinModel.add(m_leftLegGroup)

      // ============================================
      // OVERLAY LAYERS (slightly larger, initially hidden)
      // ============================================
      const overlayScale = 1.1 // 10% larger than base

      // Head Overlay (Hat/Helmet)
      const headOverlayGeometry = new THREE.BoxGeometry(8 * pixelSize * overlayScale, 8 * pixelSize * overlayScale, 8 * pixelSize * overlayScale)
      const headOverlayMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000, transparent: true, opacity: 0.8 })
      m_headOverlayMesh = new THREE.Mesh(headOverlayGeometry, headOverlayMaterial)
      m_headOverlayMesh.position.copy(m_headMesh.position)
      m_headOverlayMesh.name = 'headOverlay'
      m_headOverlayMesh.visible = false
      m_skinModel.add(m_headOverlayMesh)

      // Body Overlay (Jacket)
      const bodyOverlayGeometry = new THREE.BoxGeometry(8 * pixelSize * overlayScale, 12 * pixelSize * overlayScale, 4 * pixelSize * overlayScale)
      const bodyOverlayMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00, transparent: true, opacity: 0.8 })
      m_bodyOverlayMesh = new THREE.Mesh(bodyOverlayGeometry, bodyOverlayMaterial)
      m_bodyOverlayMesh.position.copy(m_bodyMesh.position)
      m_bodyOverlayMesh.name = 'bodyOverlay'
      m_bodyOverlayMesh.visible = false
      m_skinModel.add(m_bodyOverlayMesh)

      // Right Arm Overlay (Sleeve) - add to arm group
      const armOverlayGeometry = new THREE.BoxGeometry(4 * pixelSize * overlayScale, 12 * pixelSize * overlayScale, 4 * pixelSize * overlayScale)
      const rightArmOverlayMaterial = new THREE.MeshLambertMaterial({ color: 0x0000ff, transparent: true, opacity: 0.8 })
      m_rightArmOverlayMesh = new THREE.Mesh(armOverlayGeometry, rightArmOverlayMaterial)
      m_rightArmOverlayMesh.position.copy(m_rightArmMesh.position)
      m_rightArmOverlayMesh.name = 'rightArmOverlay'
      m_rightArmOverlayMesh.visible = false
      m_rightArmGroup.add(m_rightArmOverlayMesh)

      // Left Arm Overlay (Sleeve) - add to arm group
      const leftArmOverlayMaterial = new THREE.MeshLambertMaterial({ color: 0x0000ff, transparent: true, opacity: 0.8 })
      m_leftArmOverlayMesh = new THREE.Mesh(armOverlayGeometry.clone(), leftArmOverlayMaterial)
      m_leftArmOverlayMesh.position.copy(m_leftArmMesh.position)
      m_leftArmOverlayMesh.name = 'leftArmOverlay'
      m_leftArmOverlayMesh.visible = false
      m_leftArmGroup.add(m_leftArmOverlayMesh)

      // Right Leg Overlay (Pants) - add to leg group
      const legOverlayGeometry = new THREE.BoxGeometry(4 * pixelSize * overlayScale, 12 * pixelSize * overlayScale, 4 * pixelSize * overlayScale)
      const rightLegOverlayMaterial = new THREE.MeshLambertMaterial({ color: 0xffff00, transparent: true, opacity: 0.8 })
      m_rightLegOverlayMesh = new THREE.Mesh(legOverlayGeometry, rightLegOverlayMaterial)
      m_rightLegOverlayMesh.position.copy(m_rightLegMesh.position)
      m_rightLegOverlayMesh.name = 'rightLegOverlay'
      m_rightLegOverlayMesh.visible = false
      m_rightLegGroup.add(m_rightLegOverlayMesh)

      // Left Leg Overlay (Pants) - add to leg group
      const leftLegOverlayMaterial = new THREE.MeshLambertMaterial({ color: 0xffff00, transparent: true, opacity: 0.8 })
      m_leftLegOverlayMesh = new THREE.Mesh(legOverlayGeometry.clone(), leftLegOverlayMaterial)
      m_leftLegOverlayMesh.position.copy(m_leftLegMesh.position)
      m_leftLegOverlayMesh.name = 'leftLegOverlay'
      m_leftLegOverlayMesh.visible = false
      m_leftLegGroup.add(m_leftLegOverlayMesh)

      // Add grid floor
      const gridHelper = new THREE.GridHelper(10, 10, 0x444444, 0x888888)
      m_scene.add(gridHelper)

      m_scene.add(m_skinModel)

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
  getSkinModel!: () => THREE.Group
  getHeadMesh!: () => THREE.Mesh
  getBodyMesh!: () => THREE.Mesh
  getRightArmMesh!: () => THREE.Mesh
  getLeftArmMesh!: () => THREE.Mesh
  getRightLegMesh!: () => THREE.Mesh
  getLeftLegMesh!: () => THREE.Mesh
  getHeadOverlayMesh!: () => THREE.Mesh
  getBodyOverlayMesh!: () => THREE.Mesh
  getRightArmOverlayMesh!: () => THREE.Mesh
  getLeftArmOverlayMesh!: () => THREE.Mesh
  getRightLegOverlayMesh!: () => THREE.Mesh
  getLeftLegOverlayMesh!: () => THREE.Mesh
  getRightArmGroup!: () => THREE.Group
  getLeftArmGroup!: () => THREE.Group
  getRightLegGroup!: () => THREE.Group
  getLeftLegGroup!: () => THREE.Group
  handleResize!: () => void
}
