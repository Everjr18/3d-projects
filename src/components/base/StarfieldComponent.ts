import * as THREE from 'three'

interface StarfieldConfig {
  numStars: number
  radiusMin: number
  radiusMax: number
  size: number
  hue: number
  saturation: number
  textureUrl: string
}

export class StarfieldComponent {
  constructor(config: StarfieldConfig) {
    const m_points = createStarfield(config)

    this.getPoints = () => m_points

    function randomSpherePoint(): { pos: THREE.Vector3; hue: number } {
      const radius = Math.random() * (config.radiusMax - config.radiusMin) + config.radiusMin
      const u = Math.random()
      const v = Math.random()
      const theta = 2 * Math.PI * u
      const phi = Math.acos(2 * v - 1)
      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)

      return {
        pos: new THREE.Vector3(x, y, z),
        hue: config.hue,
      }
    }

    function createStarfield(cfg: StarfieldConfig): THREE.Points {
      const verts: number[] = []
      const colors: number[] = []

      for (let i = 0; i < cfg.numStars; i++) {
        const { pos, hue } = randomSpherePoint()
        const col = new THREE.Color().setHSL(hue, cfg.saturation, Math.random())
        verts.push(pos.x, pos.y, pos.z)
        colors.push(col.r, col.g, col.b)
      }

      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3))
      geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))

      const material = new THREE.PointsMaterial({
        size: cfg.size,
        vertexColors: true,
        map: new THREE.TextureLoader().load(cfg.textureUrl),
      })

      return new THREE.Points(geometry, material)
    }
  }

  getPoints!: () => THREE.Points
}
