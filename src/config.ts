export const SIDEBAR_WIDTH = 400

export const CELESTIAL_OBJECTS = {
  SUN: {
    name: 'sunMesh',
    position: { x: -50, y: 0, z: 3 },
    scale: 5,
    shader: {
      coreColor: 0xffff00,
      rimColor: 0xffaa00,
      textureUrl: '/img/sun.jpg',
    },
  },
  MOON: {
    name: 'moonMesh',
    position: { x: 3.5, y: 0, z: 3.5 },
    scale: 1 / 2.7,
    textures: {
      map: '/img/moonmap1k.jpg',
      bumpMap: '/img/moonbump1k.jpg',
    },
    bumpScale: 0.04,
  },
  EARTH: {
    layers: {
      surface: {
        name: 'earthMesh',
        scale: 1,
        textures: {
          map: '/img/earthmap1k.jpg',
          specularMap: '/img/earthspec1k.jpg',
          bumpMap: '/img/earthcloudmaptrans.jpg',
        },
        bumpScale: 0.04,
      },
      lights: {
        name: 'lightMesh',
        scale: 1,
        texture: '/img/earthlights1k.jpg',
      },
      clouds: {
        name: 'cloudsMesh',
        scale: 1.003,
        textures: {
          map: '/img/earthcloudmap.jpg',
          alphaMap: '/img/earthcloudmaptrans.jpg',
        },
      },
      glow: {
        name: 'glowMesh',
        scale: 1.01,
        fresnel: {
          rimHex: 0x0088ff,
          facingHex: 0x000000,
        },
      },
    },
  },
  SATELLITE: {
    name: 'satelliteMesh',
    position: { x: 1, y: 1, z: 1 },
    scale: 0.05,
    rotation: { x: Math.PI / 4, y: 0, z: 0 },
    model: {
      obj: '/obj/Satelite.obj',
      mtl: '/obj/Satelite.mtl',
    },
  },
  SKULL: {
    name: 'skullMesh',
    position: { x: -15, y: 0, z: 0 },
    scale: 0.05,
    rotation: { x: -Math.PI / 2, y: 0, z: 0 },
    model: {
      obj: '/obj/12140_Skull_v3_L2.obj',
      mtl: '/obj/12140_Skull_v3_L2.mtl',
    },
    light: {
      color: 0xffffff,
      intensity: 3,
      distance: 10,
    },
  },
  STARFIELD: {
    numStars: 2000,
    radius: { min: 100, max: 125 },
    size: 0.8,
    hue: 0.6,
    saturation: 0.2,
    texture: '/img/circle.png',
  },
}

export const LIGHTS = {
  DIRECTIONAL: {
    color: 0xffffff,
    intensity: 2.0,
    position: { x: -2, y: 0.5, z: 1.5 },
  },
  AMBIENT: {
    color: 0xffffff,
    intensity: 0.3,
    position: { x: 0, y: 1, z: 0 },
  },
}

export const CAMERA = {
  fov: 75,
  near: 0.1,
  far: 1000,
  position: { x: 0, y: 0, z: 7 },
}

export const CONTROLS = {
  enableDamping: true,
  dampingFactor: 0.03,
  autoRotate: true,
  autoRotateSpeed: 0.5,
}

export const GEOMETRY = {
  SPHERE: {
    radius: 1,
    detail: 12,
  },
}
