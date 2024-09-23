import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import createStarfield from './components/createStarfield'
import createMoon from './components/createMoon'
import createSun from './components/createSun'
import createCamera from './components/createCamera'
import createRenderer from './components/createRenderer'
import createSatellite from './components/createSatellite'
import createEarth from './components/createEarth'
import createLights from './components/createLights'

// Configuration
const renderer = createRenderer()
const camera = createCamera()
const scene = new THREE.Scene()
document.body.appendChild(renderer.domElement)
const control = new OrbitControls(camera, renderer.domElement)
control.enableDamping = true
control.dampingFactor = 0.03
createLights(scene)

// Create Solar System  //
const starts = createStarfield({ numStars: 2000 })
scene.add(starts)
const earthGroup = new THREE.Group()
const axesHelper = new THREE.AxesHelper(5)
earthGroup.add(axesHelper)
const sun = createSun(scene)
scene.add(sun)
const { earthMesh, lightMesh, cloudsMesh, glowMesh } = createEarth(earthGroup)
scene.add(earthGroup)
createSatellite(scene)
const moonGroup = createMoon(scene)
earthGroup.add(moonGroup)

// Animation
function animate() {
  const speed = 0.0115
  requestAnimationFrame(animate)
  earthMesh.rotation.y += speed
  lightMesh.rotation.y += speed
  cloudsMesh.rotation.y += speed + 0.002
  glowMesh.rotation.y += speed
  starts.rotation.y -= speed / 30
  earthGroup.rotateOnAxis(earthGroup.up, speed / 27)
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
