import * as THREE from 'three';
import { SceneObject } from './SceneObject';

export class MeshComponent extends SceneObject {
  constructor(geometry: THREE.BufferGeometry, material: THREE.Material) {
    super();

    const m_mesh = new THREE.Mesh(geometry, material);

    this.setObject3D(m_mesh);

    this.getMesh = getMesh;
    function getMesh(): THREE.Mesh {
      return m_mesh;
    }
  }

  getMesh!: () => THREE.Mesh;
}
