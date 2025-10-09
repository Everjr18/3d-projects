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

      // Create Minecraft character model with EXACT proportions and UV mapping
      // Minecraft uses pixels: 1 pixel = 0.125 units in Three.js
      const pixelSize = 0.125

      // Create default skin texture
      const defaultTexture = createDefaultSkinTexture()
      defaultTexture.magFilter = THREE.NearestFilter
      defaultTexture.minFilter = THREE.NearestFilter
      defaultTexture.wrapS = THREE.ClampToEdgeWrapping
      defaultTexture.wrapT = THREE.ClampToEdgeWrapping

      m_skinModel = new THREE.Group()
      m_skinModel.position.y = 0

      // Head (8x8x8 pixels) with UV mapping
      const headGeometry = createHeadGeometry(pixelSize)
      const headMaterial = new THREE.MeshLambertMaterial({ map: defaultTexture })
      m_headMesh = new THREE.Mesh(headGeometry, headMaterial)
      m_headMesh.position.y = 28 * pixelSize
      m_headMesh.name = 'head'
      m_skinModel.add(m_headMesh)

      // Body (8x12x4 pixels) with UV mapping
      const bodyGeometry = createBodyGeometry(pixelSize)
      const bodyMaterial = new THREE.MeshLambertMaterial({ map: defaultTexture })
      m_bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial)
      m_bodyMesh.position.y = 18 * pixelSize
      m_bodyMesh.name = 'body'
      m_skinModel.add(m_bodyMesh)

      // Right Arm (4x12x4 pixels) - with pivot at shoulder and UV mapping
      const rightArmGeometry = createRightArmGeometry(pixelSize)
      const rightArmMaterial = new THREE.MeshLambertMaterial({ map: defaultTexture })
      m_rightArmMesh = new THREE.Mesh(rightArmGeometry, rightArmMaterial)
      m_rightArmMesh.position.y = -6 * pixelSize // Move down half the arm height from pivot
      m_rightArmMesh.name = 'rightArm'

      // Create group for right arm at shoulder position
      m_rightArmGroup = new THREE.Group()
      m_rightArmGroup.position.set(-6 * pixelSize, 24 * pixelSize, 0) // Shoulder position (top of body)
      m_rightArmGroup.add(m_rightArmMesh)
      m_skinModel.add(m_rightArmGroup)

      // Left Arm (4x12x4 pixels) - with pivot at shoulder and UV mapping
      const leftArmGeometry = createLeftArmGeometry(pixelSize)
      const leftArmMaterial = new THREE.MeshLambertMaterial({ map: defaultTexture })
      m_leftArmMesh = new THREE.Mesh(leftArmGeometry, leftArmMaterial)
      m_leftArmMesh.position.y = -6 * pixelSize
      m_leftArmMesh.name = 'leftArm'

      // Create group for left arm at shoulder position
      m_leftArmGroup = new THREE.Group()
      m_leftArmGroup.position.set(6 * pixelSize, 24 * pixelSize, 0)
      m_leftArmGroup.add(m_leftArmMesh)
      m_skinModel.add(m_leftArmGroup)

      // Right Leg (4x12x4 pixels) - with pivot at hip and UV mapping
      const rightLegGeometry = createRightLegGeometry(pixelSize)
      const rightLegMaterial = new THREE.MeshLambertMaterial({ map: defaultTexture })
      m_rightLegMesh = new THREE.Mesh(rightLegGeometry, rightLegMaterial)
      m_rightLegMesh.position.y = -6 * pixelSize
      m_rightLegMesh.name = 'rightLeg'

      // Create group for right leg at hip position
      m_rightLegGroup = new THREE.Group()
      m_rightLegGroup.position.set(-2 * pixelSize, 12 * pixelSize, 0)
      m_rightLegGroup.add(m_rightLegMesh)
      m_skinModel.add(m_rightLegGroup)

      // Left Leg (4x12x4 pixels) - with pivot at hip and UV mapping
      const leftLegGeometry = createLeftLegGeometry(pixelSize)
      const leftLegMaterial = new THREE.MeshLambertMaterial({ map: defaultTexture })
      m_leftLegMesh = new THREE.Mesh(leftLegGeometry, leftLegMaterial)
      m_leftLegMesh.position.y = -6 * pixelSize
      m_leftLegMesh.name = 'leftLeg'

      // Create group for left leg at hip position
      m_leftLegGroup = new THREE.Group()
      m_leftLegGroup.position.set(2 * pixelSize, 12 * pixelSize, 0)
      m_leftLegGroup.add(m_leftLegMesh)
      m_skinModel.add(m_leftLegGroup)

      // ============================================
      // OVERLAY LAYERS (slightly larger, initially hidden)
      // ============================================
      const overlayScale = 1.05 // 5% larger than base for overlay effect

      // Head Overlay (Hat/Helmet) with UV mapping for outer layer
      const headOverlayGeometry = createHeadOverlayGeometry(pixelSize, overlayScale)
      const headOverlayMaterial = new THREE.MeshLambertMaterial({
        map: defaultTexture,
        transparent: true,
        alphaTest: 0.5
      })
      m_headOverlayMesh = new THREE.Mesh(headOverlayGeometry, headOverlayMaterial)
      m_headOverlayMesh.position.copy(m_headMesh.position)
      m_headOverlayMesh.name = 'headOverlay'
      m_headOverlayMesh.visible = false
      m_skinModel.add(m_headOverlayMesh)

      // Body Overlay (Jacket) with UV mapping
      const bodyOverlayGeometry = createBodyOverlayGeometry(pixelSize, overlayScale)
      const bodyOverlayMaterial = new THREE.MeshLambertMaterial({
        map: defaultTexture,
        transparent: true,
        alphaTest: 0.5
      })
      m_bodyOverlayMesh = new THREE.Mesh(bodyOverlayGeometry, bodyOverlayMaterial)
      m_bodyOverlayMesh.position.copy(m_bodyMesh.position)
      m_bodyOverlayMesh.name = 'bodyOverlay'
      m_bodyOverlayMesh.visible = false
      m_skinModel.add(m_bodyOverlayMesh)

      // Right Arm Overlay (Sleeve) - add to arm group with UV mapping
      const rightArmOverlayGeometry = createRightArmOverlayGeometry(pixelSize, overlayScale)
      const rightArmOverlayMaterial = new THREE.MeshLambertMaterial({
        map: defaultTexture,
        transparent: true,
        alphaTest: 0.5
      })
      m_rightArmOverlayMesh = new THREE.Mesh(rightArmOverlayGeometry, rightArmOverlayMaterial)
      m_rightArmOverlayMesh.position.copy(m_rightArmMesh.position)
      m_rightArmOverlayMesh.name = 'rightArmOverlay'
      m_rightArmOverlayMesh.visible = false
      m_rightArmGroup.add(m_rightArmOverlayMesh)

      // Left Arm Overlay (Sleeve) - add to arm group with UV mapping
      const leftArmOverlayGeometry = createLeftArmOverlayGeometry(pixelSize, overlayScale)
      const leftArmOverlayMaterial = new THREE.MeshLambertMaterial({
        map: defaultTexture,
        transparent: true,
        alphaTest: 0.5
      })
      m_leftArmOverlayMesh = new THREE.Mesh(leftArmOverlayGeometry, leftArmOverlayMaterial)
      m_leftArmOverlayMesh.position.copy(m_leftArmMesh.position)
      m_leftArmOverlayMesh.name = 'leftArmOverlay'
      m_leftArmOverlayMesh.visible = false
      m_leftArmGroup.add(m_leftArmOverlayMesh)

      // Right Leg Overlay (Pants) - add to leg group with UV mapping
      const rightLegOverlayGeometry = createRightLegOverlayGeometry(pixelSize, overlayScale)
      const rightLegOverlayMaterial = new THREE.MeshLambertMaterial({
        map: defaultTexture,
        transparent: true,
        alphaTest: 0.5
      })
      m_rightLegOverlayMesh = new THREE.Mesh(rightLegOverlayGeometry, rightLegOverlayMaterial)
      m_rightLegOverlayMesh.position.copy(m_rightLegMesh.position)
      m_rightLegOverlayMesh.name = 'rightLegOverlay'
      m_rightLegOverlayMesh.visible = false
      m_rightLegGroup.add(m_rightLegOverlayMesh)

      // Left Leg Overlay (Pants) - add to leg group with UV mapping
      const leftLegOverlayGeometry = createLeftLegOverlayGeometry(pixelSize, overlayScale)
      const leftLegOverlayMaterial = new THREE.MeshLambertMaterial({
        map: defaultTexture,
        transparent: true,
        alphaTest: 0.5
      })
      m_leftLegOverlayMesh = new THREE.Mesh(leftLegOverlayGeometry, leftLegOverlayMaterial)
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

// Helper function to create default skin texture (Steve-like)
function createDefaultSkinTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 64
  canvas.height = 64
  const ctx = canvas.getContext('2d')!

  // Fill with transparent background
  ctx.clearRect(0, 0, 64, 64)

  const skinColor = '#ffdbac'
  const shirtColor = '#4a90e2'
  const pantsColor = '#2c5aa0'

  // HEAD - Base Layer
  ctx.fillStyle = skinColor
  ctx.fillRect(8, 0, 8, 8)   // Top
  ctx.fillRect(16, 0, 8, 8)  // Bottom
  ctx.fillRect(0, 8, 8, 8)   // Right
  ctx.fillRect(8, 8, 8, 8)   // Front
  ctx.fillRect(16, 8, 8, 8)  // Left
  ctx.fillRect(24, 8, 8, 8)  // Back

  // BODY - Base Layer
  ctx.fillStyle = shirtColor
  ctx.fillRect(20, 16, 8, 4)  // Top
  ctx.fillRect(28, 16, 8, 4)  // Bottom
  ctx.fillRect(16, 20, 4, 12) // Right
  ctx.fillRect(20, 20, 8, 12) // Front
  ctx.fillRect(28, 20, 4, 12) // Left
  ctx.fillRect(32, 20, 8, 12) // Back

  // RIGHT ARM - Base Layer
  ctx.fillStyle = skinColor
  ctx.fillRect(44, 16, 4, 4)  // Top
  ctx.fillRect(48, 16, 4, 4)  // Bottom
  ctx.fillRect(40, 20, 4, 12) // Outer
  ctx.fillRect(44, 20, 4, 12) // Front
  ctx.fillRect(48, 20, 4, 12) // Inner
  ctx.fillRect(52, 20, 4, 12) // Back

  // RIGHT LEG - Base Layer
  ctx.fillStyle = pantsColor
  ctx.fillRect(4, 16, 4, 4)   // Top
  ctx.fillRect(8, 16, 4, 4)   // Bottom
  ctx.fillRect(0, 20, 4, 12)  // Right
  ctx.fillRect(4, 20, 4, 12)  // Front
  ctx.fillRect(8, 20, 4, 12)  // Left
  ctx.fillRect(12, 20, 4, 12) // Back

  // LEFT LEG - Base Layer
  ctx.fillRect(20, 48, 4, 4)  // Top
  ctx.fillRect(24, 48, 4, 4)  // Bottom
  ctx.fillRect(16, 52, 4, 12) // Right
  ctx.fillRect(20, 52, 4, 12) // Front
  ctx.fillRect(24, 52, 4, 12) // Left
  ctx.fillRect(28, 52, 4, 12) // Back

  // LEFT ARM - Base Layer
  ctx.fillStyle = skinColor
  ctx.fillRect(36, 48, 4, 4)  // Top
  ctx.fillRect(40, 48, 4, 4)  // Bottom
  ctx.fillRect(32, 52, 4, 12) // Right
  ctx.fillRect(36, 52, 4, 12) // Front
  ctx.fillRect(40, 52, 4, 12) // Left
  ctx.fillRect(44, 52, 4, 12) // Back

  return new THREE.CanvasTexture(canvas)
}

// Helper function to create head geometry with proper UV mapping
function createHeadGeometry(pixelSize: number): THREE.BoxGeometry {
  const geometry = new THREE.BoxGeometry(8 * pixelSize, 8 * pixelSize, 8 * pixelSize)

  // Manual UV mapping for proper Minecraft skin layout
  // Minecraft head layout: https://minecraft.wiki/w/Player.cgi
  // Texture coordinates (u,v) where u=x/64, v=y/64
  // Note: Canvas Y goes down, but texture V coordinate goes up, so we flip: v = 1 - (y/64)

  const uvAttribute = geometry.attributes.uv
  const uvs = uvAttribute.array as Float32Array

  // BoxGeometry face order: Right(+X), Left(-X), Top(+Y), Bottom(-Y), Front(+Z), Back(-Z)
  // Each face: 4 vertices forming 2 triangles

  // Right face (+X) -> Left side of head (16, 8, 24, 16) - SWAPPED
  setFaceUVs(uvs, 0, 16, 8, 24, 16)

  // Left face (-X) -> Right side of head (0, 8, 8, 16) - SWAPPED
  setFaceUVs(uvs, 1, 0, 8, 8, 16)

  // Top face (+Y) -> Top of head (8, 0, 16, 8)
  setFaceUVs(uvs, 2, 8, 0, 16, 8)

  // Bottom face (-Y) -> Bottom of head (16, 0, 24, 8)
  setFaceUVs(uvs, 3, 16, 0, 24, 8)

  // Front face (+Z) -> Face (8, 8, 16, 16)
  setFaceUVs(uvs, 4, 8, 8, 16, 16)

  // Back face (-Z) -> Back of head (24, 8, 32, 16)
  setFaceUVs(uvs, 5, 24, 8, 32, 16)

  uvAttribute.needsUpdate = true
  return geometry
}

// Helper to set UVs for a face
// Three.js UV coordinates: (0,0) = bottom-left, (1,1) = top-right
// Minecraft texture: (0,0) = top-left, (64,64) = bottom-right
function setFaceUVs(uvs: Float32Array, faceIndex: number, x1: number, y1: number, x2: number, y2: number) {
  const offset = faceIndex * 8
  const u1 = x1 / 64
  const u2 = x2 / 64
  // Convert texture coordinates to UV coordinates
  const v1 = 1 - y1 / 64  // y1 is top of texture region
  const v2 = 1 - y2 / 64  // y2 is bottom of texture region

  // Four vertices per face in Three.js order
  // Swap the V assignments to flip vertically
  uvs[offset + 0] = u1  // bottom-left
  uvs[offset + 1] = v1  // SWAPPED: use top V
  uvs[offset + 2] = u2  // bottom-right
  uvs[offset + 3] = v1  // SWAPPED: use top V
  uvs[offset + 4] = u1  // top-left
  uvs[offset + 5] = v2  // SWAPPED: use bottom V
  uvs[offset + 6] = u2  // top-right
  uvs[offset + 7] = v2  // SWAPPED: use bottom V
}

// Helper function to create body geometry with proper UV mapping
function createBodyGeometry(pixelSize: number): THREE.BoxGeometry {
  const geometry = new THREE.BoxGeometry(8 * pixelSize, 12 * pixelSize, 4 * pixelSize)

  const uvAttribute = geometry.attributes.uv
  const uvs = uvAttribute.array as Float32Array

  // Minecraft body UV layout (8w x 12h x 4d)
  // Right face (+X) -> Left side (28, 20, 32, 32) - SWAPPED
  setFaceUVs(uvs, 0, 28, 20, 32, 32)

  // Left face (-X) -> Right side (16, 20, 20, 32) - SWAPPED
  setFaceUVs(uvs, 1, 16, 20, 20, 32)

  // Top face (+Y) -> Top (20, 16, 28, 20)
  setFaceUVs(uvs, 2, 20, 16, 28, 20)

  // Bottom face (-Y) -> Bottom (28, 16, 36, 20)
  setFaceUVs(uvs, 3, 28, 16, 36, 20)

  // Front face (+Z) -> Front (20, 20, 28, 32)
  setFaceUVs(uvs, 4, 20, 20, 28, 32)

  // Back face (-Z) -> Back (32, 20, 40, 32)
  setFaceUVs(uvs, 5, 32, 20, 40, 32)

  uvAttribute.needsUpdate = true
  return geometry
}

// Helper function to create right arm geometry with proper UV mapping
function createRightArmGeometry(pixelSize: number): THREE.BoxGeometry {
  const geometry = new THREE.BoxGeometry(4 * pixelSize, 12 * pixelSize, 4 * pixelSize)

  const uvAttribute = geometry.attributes.uv
  const uvs = uvAttribute.array as Float32Array

  // Minecraft right arm UV layout (4w x 12h x 4d)
  // Right face (+X) -> Inner side (48, 20, 52, 32) - SWAPPED
  setFaceUVs(uvs, 0, 48, 20, 52, 32)

  // Left face (-X) -> Outer side (40, 20, 44, 32) - SWAPPED
  setFaceUVs(uvs, 1, 40, 20, 44, 32)

  // Top face (+Y) -> Top/shoulder (44, 16, 48, 20)
  setFaceUVs(uvs, 2, 44, 16, 48, 20)

  // Bottom face (-Y) -> Bottom/hand (48, 16, 52, 20)
  setFaceUVs(uvs, 3, 48, 16, 52, 20)

  // Front face (+Z) -> Front (44, 20, 48, 32)
  setFaceUVs(uvs, 4, 44, 20, 48, 32)

  // Back face (-Z) -> Back (52, 20, 56, 32)
  setFaceUVs(uvs, 5, 52, 20, 56, 32)

  uvAttribute.needsUpdate = true
  return geometry
}

// Helper function to create left arm geometry with proper UV mapping
function createLeftArmGeometry(pixelSize: number): THREE.BoxGeometry {
  const geometry = new THREE.BoxGeometry(4 * pixelSize, 12 * pixelSize, 4 * pixelSize)

  const uvAttribute = geometry.attributes.uv
  const uvs = uvAttribute.array as Float32Array

  // Minecraft left arm UV layout (4w x 12h x 4d) at (32, 48)
  // Right face (+X) -> Inner side (40, 52, 44, 64) - SWAPPED
  setFaceUVs(uvs, 0, 40, 52, 44, 64)

  // Left face (-X) -> Outer side (32, 52, 36, 64) - SWAPPED
  setFaceUVs(uvs, 1, 32, 52, 36, 64)

  // Top face (+Y) -> Top/shoulder (36, 48, 40, 52)
  setFaceUVs(uvs, 2, 36, 48, 40, 52)

  // Bottom face (-Y) -> Bottom/hand (40, 48, 44, 52)
  setFaceUVs(uvs, 3, 40, 48, 44, 52)

  // Front face (+Z) -> Front (36, 52, 40, 64)
  setFaceUVs(uvs, 4, 36, 52, 40, 64)

  // Back face (-Z) -> Back (44, 52, 48, 64)
  setFaceUVs(uvs, 5, 44, 52, 48, 64)

  uvAttribute.needsUpdate = true
  return geometry
}

// Helper function to create right leg geometry with proper UV mapping
function createRightLegGeometry(pixelSize: number): THREE.BoxGeometry {
  const geometry = new THREE.BoxGeometry(4 * pixelSize, 12 * pixelSize, 4 * pixelSize)

  const uvAttribute = geometry.attributes.uv
  const uvs = uvAttribute.array as Float32Array

  // Minecraft right leg UV layout (4w x 12h x 4d) at (0, 16)
  // Right face (+X) -> Left side (8, 20, 12, 32) - SWAPPED
  setFaceUVs(uvs, 0, 8, 20, 12, 32)

  // Left face (-X) -> Right side (0, 20, 4, 32) - SWAPPED
  setFaceUVs(uvs, 1, 0, 20, 4, 32)

  // Top face (+Y) -> Top/hip (4, 16, 8, 20)
  setFaceUVs(uvs, 2, 4, 16, 8, 20)

  // Bottom face (-Y) -> Bottom/foot (8, 16, 12, 20)
  setFaceUVs(uvs, 3, 8, 16, 12, 20)

  // Front face (+Z) -> Front (4, 20, 8, 32)
  setFaceUVs(uvs, 4, 4, 20, 8, 32)

  // Back face (-Z) -> Back (12, 20, 16, 32)
  setFaceUVs(uvs, 5, 12, 20, 16, 32)

  uvAttribute.needsUpdate = true
  return geometry
}

// Helper function to create left leg geometry with proper UV mapping
function createLeftLegGeometry(pixelSize: number): THREE.BoxGeometry {
  const geometry = new THREE.BoxGeometry(4 * pixelSize, 12 * pixelSize, 4 * pixelSize)

  const uvAttribute = geometry.attributes.uv
  const uvs = uvAttribute.array as Float32Array

  // Minecraft left leg UV layout (4w x 12h x 4d) at (16, 48)
  // Right face (+X) -> Left side (24, 52, 28, 64) - SWAPPED
  setFaceUVs(uvs, 0, 24, 52, 28, 64)

  // Left face (-X) -> Right side (16, 52, 20, 64) - SWAPPED
  setFaceUVs(uvs, 1, 16, 52, 20, 64)

  // Top face (+Y) -> Top/hip (20, 48, 24, 52)
  setFaceUVs(uvs, 2, 20, 48, 24, 52)

  // Bottom face (-Y) -> Bottom/foot (24, 48, 28, 52)
  setFaceUVs(uvs, 3, 24, 48, 28, 52)

  // Front face (+Z) -> Front (20, 52, 24, 64)
  setFaceUVs(uvs, 4, 20, 52, 24, 64)

  // Back face (-Z) -> Back (28, 52, 32, 64)
  setFaceUVs(uvs, 5, 28, 52, 32, 64)

  uvAttribute.needsUpdate = true
  return geometry
}

// Helper function to create head overlay geometry with proper UV mapping
function createHeadOverlayGeometry(pixelSize: number, scale: number): THREE.BoxGeometry {
  const geometry = new THREE.BoxGeometry(8 * pixelSize * scale, 8 * pixelSize * scale, 8 * pixelSize * scale)

  const uvAttribute = geometry.attributes.uv
  const uvs = uvAttribute.array as Float32Array

  // Minecraft head overlay UV layout (32-64, 0-16) - right half of texture
  setFaceUVs(uvs, 0, 48, 8, 56, 16)   // Right -> Left SWAPPED
  setFaceUVs(uvs, 1, 32, 8, 40, 16)   // Left -> Right SWAPPED
  setFaceUVs(uvs, 2, 40, 0, 48, 8)    // Top
  setFaceUVs(uvs, 3, 48, 0, 56, 8)    // Bottom
  setFaceUVs(uvs, 4, 40, 8, 48, 16)   // Front
  setFaceUVs(uvs, 5, 56, 8, 64, 16)   // Back

  uvAttribute.needsUpdate = true
  return geometry
}

// Helper function to create body overlay geometry with proper UV mapping
function createBodyOverlayGeometry(pixelSize: number, scale: number): THREE.BoxGeometry {
  const geometry = new THREE.BoxGeometry(8 * pixelSize * scale, 12 * pixelSize * scale, 4 * pixelSize * scale)

  const uvAttribute = geometry.attributes.uv
  const uvs = uvAttribute.array as Float32Array

  // Minecraft body overlay UV layout (16-40, 32-48) - overlay section
  setFaceUVs(uvs, 0, 28, 36, 32, 48)  // Right -> Left SWAPPED
  setFaceUVs(uvs, 1, 16, 36, 20, 48)  // Left -> Right SWAPPED
  setFaceUVs(uvs, 2, 20, 32, 28, 36)  // Top
  setFaceUVs(uvs, 3, 28, 32, 36, 36)  // Bottom
  setFaceUVs(uvs, 4, 20, 36, 28, 48)  // Front
  setFaceUVs(uvs, 5, 32, 36, 40, 48)  // Back

  uvAttribute.needsUpdate = true
  return geometry
}

// Helper function to create right arm overlay geometry with proper UV mapping
function createRightArmOverlayGeometry(pixelSize: number, scale: number): THREE.BoxGeometry {
  const geometry = new THREE.BoxGeometry(4 * pixelSize * scale, 12 * pixelSize * scale, 4 * pixelSize * scale)

  const uvAttribute = geometry.attributes.uv
  const uvs = uvAttribute.array as Float32Array

  // Minecraft right arm overlay UV layout (40-56, 32-48)
  setFaceUVs(uvs, 0, 48, 36, 52, 48)  // Right -> Inner SWAPPED
  setFaceUVs(uvs, 1, 40, 36, 44, 48)  // Left -> Outer SWAPPED
  setFaceUVs(uvs, 2, 44, 32, 48, 36)  // Top
  setFaceUVs(uvs, 3, 48, 32, 52, 36)  // Bottom
  setFaceUVs(uvs, 4, 44, 36, 48, 48)  // Front
  setFaceUVs(uvs, 5, 52, 36, 56, 48)  // Back

  uvAttribute.needsUpdate = true
  return geometry
}

// Helper function to create left arm overlay geometry with proper UV mapping
function createLeftArmOverlayGeometry(pixelSize: number, scale: number): THREE.BoxGeometry {
  const geometry = new THREE.BoxGeometry(4 * pixelSize * scale, 12 * pixelSize * scale, 4 * pixelSize * scale)

  const uvAttribute = geometry.attributes.uv
  const uvs = uvAttribute.array as Float32Array

  // Minecraft left arm overlay UV layout (48-64, 48-64)
  setFaceUVs(uvs, 0, 56, 52, 60, 64)  // Right -> Left SWAPPED
  setFaceUVs(uvs, 1, 48, 52, 52, 64)  // Left -> Right SWAPPED
  setFaceUVs(uvs, 2, 52, 48, 56, 52)  // Top
  setFaceUVs(uvs, 3, 56, 48, 60, 52)  // Bottom
  setFaceUVs(uvs, 4, 52, 52, 56, 64)  // Front
  setFaceUVs(uvs, 5, 60, 52, 64, 64)  // Back

  uvAttribute.needsUpdate = true
  return geometry
}

// Helper function to create right leg overlay geometry with proper UV mapping
function createRightLegOverlayGeometry(pixelSize: number, scale: number): THREE.BoxGeometry {
  const geometry = new THREE.BoxGeometry(4 * pixelSize * scale, 12 * pixelSize * scale, 4 * pixelSize * scale)

  const uvAttribute = geometry.attributes.uv
  const uvs = uvAttribute.array as Float32Array

  // Minecraft right leg overlay UV layout (0-16, 32-48)
  setFaceUVs(uvs, 0, 8, 36, 12, 48)  // Right -> Left SWAPPED
  setFaceUVs(uvs, 1, 0, 36, 4, 48)   // Left -> Right SWAPPED
  setFaceUVs(uvs, 2, 4, 32, 8, 36)   // Top
  setFaceUVs(uvs, 3, 8, 32, 12, 36)  // Bottom
  setFaceUVs(uvs, 4, 4, 36, 8, 48)   // Front
  setFaceUVs(uvs, 5, 12, 36, 16, 48) // Back

  uvAttribute.needsUpdate = true
  return geometry
}

// Helper function to create left leg overlay geometry with proper UV mapping
function createLeftLegOverlayGeometry(pixelSize: number, scale: number): THREE.BoxGeometry {
  const geometry = new THREE.BoxGeometry(4 * pixelSize * scale, 12 * pixelSize * scale, 4 * pixelSize * scale)

  const uvAttribute = geometry.attributes.uv
  const uvs = uvAttribute.array as Float32Array

  // Minecraft left leg overlay UV layout (0-16, 48-64)
  setFaceUVs(uvs, 0, 8, 52, 12, 64)  // Right -> Left SWAPPED
  setFaceUVs(uvs, 1, 0, 52, 4, 64)   // Left -> Right SWAPPED
  setFaceUVs(uvs, 2, 4, 48, 8, 52)   // Top
  setFaceUVs(uvs, 3, 8, 48, 12, 52)  // Bottom
  setFaceUVs(uvs, 4, 4, 52, 8, 64)   // Front
  setFaceUVs(uvs, 5, 12, 52, 16, 64) // Back

  uvAttribute.needsUpdate = true
  return geometry
}
