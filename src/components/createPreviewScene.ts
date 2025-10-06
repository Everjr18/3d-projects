import * as THREE from 'three'
import { getFresnelMat } from '../shaders/getFresnelMat'
import { getSunMaterial } from '../shaders/getSunMaterial'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js'

class PreviewScene {
  private scene: THREE.Scene
  private camera: THREE.PerspectiveCamera
  private renderer: THREE.WebGLRenderer
  private currentObject: THREE.Object3D | null = null
  private animationId: number | null = null

  constructor(canvas: HTMLCanvasElement) {
    // Scene
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0x000000)

    // Get actual canvas dimensions
    const rect = canvas.getBoundingClientRect()
    const width = rect.width || 400
    const height = rect.height || 300

    console.log('Preview canvas dimensions:', width, height, 'aspect:', width/height)

    // Camera
    const aspect = width / height
    this.camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 100)
    this.camera.position.z = 3

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
    this.renderer.setSize(width, height, false)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.toneMappingExposure = 0.7

    // Lights - matching main scene
    const sunLight = new THREE.DirectionalLight(0xffffff, 1.2)
    sunLight.position.set(-2, 0.5, 1.5)
    this.scene.add(sunLight)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    ambientLight.position.set(0, 1, 0)
    this.scene.add(ambientLight)
  }

  showObject(objectName: string): void {
    // Clear previous object
    if (this.currentObject) {
      this.scene.remove(this.currentObject)
      this.currentObject = null
    }

    // Reset camera position
    this.camera.position.set(0, 0, 3)

    // Create new object
    const geometry = new THREE.IcosahedronGeometry(1, 12)
    const loader = new THREE.TextureLoader()
    let mesh: THREE.Mesh

    switch (objectName) {
      case 'earthMesh':
        const earthMaterial = new THREE.MeshPhongMaterial({
          map: loader.load('public/img/earthmap1k.jpg'),
          specularMap: loader.load('public/img/earthspec1k.jpg'),
          bumpMap: loader.load('public/img/earthcloudmaptrans.jpg'),
          bumpScale: 0.04,
          shininess: 30,
          specular: 0x333333,
        })
        mesh = new THREE.Mesh(geometry, earthMaterial)

        // Add city lights
        const lightsMaterial = new THREE.MeshBasicMaterial({
          map: loader.load('public/img/earthlights1k.jpg'),
          blending: THREE.AdditiveBlending,
        })
        const lightsMesh = new THREE.Mesh(geometry, lightsMaterial)

        // Add clouds
        const cloudsMat = new THREE.MeshStandardMaterial({
          map: loader.load('public/img/earthcloudmap.jpg'),
          alphaMap: loader.load('public/img/earthcloudmaptrans.jpg'),
          transparent: true,
          opacity: 0.8,
          roughness: 1.0,
        })
        const cloudsMesh = new THREE.Mesh(geometry, cloudsMat)
        cloudsMesh.scale.setScalar(1.003)

        // Add glow
        const glowMat = getFresnelMat({ rimHex: 0x0088ff, facingHex: 0x000000 })
        const glowMesh = new THREE.Mesh(geometry, glowMat)
        glowMesh.scale.setScalar(1.01)

        const earthGroup = new THREE.Group()
        earthGroup.add(mesh)
        earthGroup.add(lightsMesh)
        earthGroup.add(cloudsMesh)
        earthGroup.add(glowMesh)
        this.currentObject = earthGroup
        break

      case 'moonMesh':
        const moonMaterial = new THREE.MeshPhongMaterial({
          map: loader.load('public/img/moonmap1k.jpg'),
          bumpMap: loader.load('public/img/moonbump1k.jpg'),
          bumpScale: 0.04,
          shininess: 5,
        })
        mesh = new THREE.Mesh(geometry, moonMaterial)
        this.currentObject = mesh
        break

      case 'sunMesh':
        const sunMaterial = getSunMaterial({
          coreColor: 0xffff00,
          rimColor: 0xffaa00,
          textureUrl: 'public/img/sun.jpg',
        })
        mesh = new THREE.Mesh(geometry, sunMaterial)
        this.currentObject = mesh
        break

      case 'satelliteMesh':
        // Load actual satellite model
        const objLoader = new OBJLoader()
        const mtlLoader = new MTLLoader()
        mtlLoader.load('public/obj/Satelite.mtl', (mtl) => {
          mtl.preload()
          for (const material of Object.values(mtl.materials)) {
            material.side = THREE.DoubleSide
          }
          objLoader.setMaterials(mtl)
          objLoader.load('public/obj/Satelite.obj', (root) => {
            root.scale.set(0.5, 0.5, 0.5)
            root.rotation.x = Math.PI / 4

            if (this.currentObject) {
              this.scene.remove(this.currentObject)
            }
            this.currentObject = root
            this.scene.add(root)
            this.startAnimation()
          })
        })

        // Move camera back for satellite
        this.camera.position.z = 5
        return // Early return since loading is async

      default:
        return
    }

    if (this.currentObject) {
      this.scene.add(this.currentObject)
      this.startAnimation()
    }
  }

  private startAnimation(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
    }

    const animate = () => {
      this.animationId = requestAnimationFrame(animate)

      if (this.currentObject) {
        this.currentObject.rotation.y += 0.01
      }

      this.renderer.render(this.scene, this.camera)
    }

    animate()
  }

  stop(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
      this.animationId = null
    }
  }

  handleResize(): void {
    const canvas = this.renderer.domElement
    const rect = canvas.getBoundingClientRect()
    const width = rect.width
    const height = rect.height

    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(width, height, false)
  }
}

export default PreviewScene
