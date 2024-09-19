import * as THREE from 'three'

const createMoon = (scene: THREE.Scene) => {
  const loader = new THREE.TextureLoader()
  const group = new THREE.Group()

  const geometry = new THREE.IcosahedronGeometry(1, 12)
  const material = new THREE.MeshPhongMaterial({
    map: loader.load('/moonmap1k.jpg'),
    bumpMap: loader.load('/moonbump1k.jpg'),
    bumpScale: 0.04,
  })
  const mesh = new THREE.Mesh(geometry, material)
  group.add(mesh)
  group.position.set(0, 0, 2)
  group.scale.setScalar(1 / 3.7)
  scene.add(group)

  return group
}

export default createMoon
