import * as THREE from 'three'

const createSphere = ( context : { scene: THREE.Scene, material: THREE.ShaderMaterial | THREE.MeshPhongMaterial, name: string, position: THREE.Vector3, scale: number }) => {

    const geometry = new THREE.IcosahedronGeometry(1, 12)

    const mesh = new THREE.Mesh(geometry, context.material)
    mesh.name = context.name

    const group = new THREE.Group()
    group.add(mesh)
    group.position.add(context.position)
    group.scale.setScalar(context.scale)

    return group
}

export default createSphere;