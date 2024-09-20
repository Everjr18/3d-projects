import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import getStarfield from './getStarts'
import { getFresnelMat } from './getFresnelMat'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js'
import createMoon from './components/createMoon'

const w = window.innerWidth
const h = window.innerHeight
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(w, h)
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.outputColorSpace = THREE.LinearSRGBColorSpace
document.body.appendChild(renderer.domElement)

const fov = 75
const aspect = w / h
const near = 0.1
const far = 1000

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
camera.position.z = 5

const scene = new THREE.Scene()

const loader = new THREE.TextureLoader()
const earthGroup = new THREE.Group()
scene.add(earthGroup)

// Start Satellite //

const objLoader = new OBJLoader()
const mtlLoader = new MTLLoader()
mtlLoader.load('Satelite.mtl', (mtl) => {
  mtl.preload()
  for (const material of Object.values(mtl.materials)) {
    material.side = THREE.DoubleSide
  }
  objLoader.setMaterials(mtl)
  objLoader.load('/Satelite.obj', (root) => {
    root.translateY(1)
    root.translateX(1)
    root.translateZ(1)
    root.scale.set(0.05, 0.05, 0.05)
    root.rotation.x = Math.PI / 4
    root.name = 'satelite'
    scene.add(root)
  })
})

// End Satellite //

const geometry = new THREE.IcosahedronGeometry(1, 12)
const material = new THREE.MeshPhongMaterial({
  map: loader.load('/earthmap1k.jpg'),
  // specularMap: loader.load('/earthspec1k.jpg'),
  // bumpMap: loader.load('/earthcloudmaptrans.jpg'),
  // bumpScale: 0.04,
})
const earthMesh = new THREE.Mesh(geometry, material)
earthGroup.add(earthMesh)
const axesHelper = new THREE.AxesHelper(5)
earthGroup.add(axesHelper)

const sunLight = new THREE.DirectionalLight(0xffffff, 2.0)
sunLight.position.set(-2, 0.5, 1.5)
scene.add(sunLight)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
ambientLight.position.set(0, 1, 0)
scene.add(ambientLight)

const starts = getStarfield({ numStars: 2000 })
scene.add(starts)

const lightsMat = new THREE.MeshBasicMaterial({
  map: loader.load('/earthlights1k.jpg'),
  blending: THREE.AdditiveBlending,
})
const lightMesh = new THREE.Mesh(geometry, lightsMat)
earthGroup.add(lightMesh)
const cloudsMat = new THREE.MeshStandardMaterial({
  map: loader.load('/earthcloudmap.jpg'),
  blending: THREE.AdditiveBlending,
  alphaMap: loader.load('/earthcloudmaptrans.jpg'),
})
const cloudsMesh = new THREE.Mesh(geometry, cloudsMat)
cloudsMesh.scale.setScalar(1.003)
earthGroup.add(cloudsMesh)
const fresnelMat = getFresnelMat()
const glowMesh = new THREE.Mesh(geometry, fresnelMat)
glowMesh.scale.setScalar(1.01)
earthGroup.add(glowMesh)

const moonGroup = createMoon(scene)
earthGroup.add(moonGroup)

earthGroup.rotation.z = (-23.4 * Math.PI) / 180
const control = new OrbitControls(camera, renderer.domElement)
control.enableDamping = true
control.dampingFactor = 0.03

earthGroup.rotateOnAxis(new THREE.Vector3( 0,1,-3), 25)

function animate() {

  const speed = 0.0015
  requestAnimationFrame(animate)
  earthMesh.rotation.y += speed
  lightMesh.rotation.y += speed
  cloudsMesh.rotation.y += speed + 0.002
  glowMesh.rotation.y += speed
  starts.rotation.y -= speed / 30
  earthGroup.rotateOnAxis(earthGroup.up, speed / 30)  
  control.update()
  renderer.render(scene, camera)
}
animate()

function handleWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}
window.addEventListener('resize', handleWindowResize, false)
