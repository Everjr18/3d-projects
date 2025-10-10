import * as THREE from 'three';
import { SceneObject } from './SceneObject';

export interface LayerConfig {
  name: string;
  mesh: THREE.Mesh;
  scale?: number;
  rotationSpeed?: number;
}

export class LayeredMeshComponent extends SceneObject {
  constructor(name: string = 'LayeredObject') {
    super();

    // Variables privadas (solo accesibles dentro del constructor via closure)
    const m_group = new THREE.Group();
    const m_layers = new Map<string, LayerConfig>();

    m_group.name = name;
    this.setObject3D(m_group);

    // Asignar funciones internas a métodos públicos de la instancia
    this.addLayer = addLayer;
    this.removeLayer = removeLayer;
    this.getLayer = getLayer;
    this.getAllLayers = getAllLayers;
    this.getGroup = getGroup;
    this.update = update;

    // Funciones internas (tienen acceso a las variables privadas m_group y m_layers)
    function addLayer(config: LayerConfig): void {
      const { name, mesh, scale = 1 } = config;

      mesh.name = name;
      mesh.scale.setScalar(scale);

      m_layers.set(name, config);
      m_group.add(mesh);
    }

    function removeLayer(name: string): void {
      const layer = m_layers.get(name);
      if (layer) {
        m_group.remove(layer.mesh);
        m_layers.delete(name);
      }
    }

    function getLayer(name: string): THREE.Mesh | undefined {
      return m_layers.get(name)?.mesh;
    }

    function getAllLayers(): Map<string, LayerConfig> {
      return m_layers;
    }

    function getGroup(): THREE.Group {
      return m_group;
    }

    function update(deltaTime: number): void {
      m_layers.forEach((layer) => {
        if (layer.rotationSpeed) {
          layer.mesh.rotation.y += layer.rotationSpeed * deltaTime;
        }
      });
    }
  }

  // Declaraciones de tipo públicas (TypeScript necesita saber que estos métodos existen)
  // El operador ! indica que serán asignados en el constructor
  addLayer!: (config: LayerConfig) => void;
  removeLayer!: (name: string) => void;
  getLayer!: (name: string) => THREE.Mesh | undefined;
  getAllLayers!: () => Map<string, LayerConfig>;
  getGroup!: () => THREE.Group;
  update!: (deltaTime: number) => void;
}
