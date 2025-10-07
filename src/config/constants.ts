/**
 * Centralized configuration and constants
 */

export const CELESTIAL_BODIES = {
  EARTH: {
    NAME: 'Earth',
    POSITION: { x: 0, y: 0, z: 0 },
    SCALE: 1,
    CAMERA_OFFSET: { x: 5, y: 2, z: 5 },
    LAYERS: {
      SURFACE: 'EarthSurface',
      LIGHTS: 'EarthLights',
      CLOUDS: 'EarthClouds',
      GLOW: 'EarthGlow',
    },
  },
  MOON: {
    NAME: 'Moon',
    POSITION: { x: 3.5, y: 0, z: 3.5 },
    SCALE: 0.37,
    CAMERA_OFFSET: { x: 2, y: 2, z: 2 },
  },
  SUN: {
    NAME: 'Sun',
    POSITION: { x: -50, y: 0, z: 3 },
    SCALE: 5,
    CAMERA_OFFSET: { x: 15, y: 6, z: 15 },
  },
  SATELLITE: {
    NAME: 'Satellite',
    POSITION: { x: 1, y: 1, z: 1 },
    SCALE: 0.05,
    CAMERA_OFFSET: { x: 5, y: 2, z: 5 },
  },
  STARFIELD: {
    NAME: 'StarField',
    NUM_STARS: 2000,
  },
}

export const TEXTURE_PATHS = {
  EARTH: {
    MAP: '/img/earthmap1k.jpg',
    SPECULAR: '/img/earthspec1k.jpg',
    BUMP: '/img/earthcloudmaptrans.jpg',
    LIGHTS: '/img/earthlights1k.jpg',
    CLOUDS: '/img/earthcloudmap.jpg',
    CLOUDS_ALPHA: '/img/earthcloudmaptrans.jpg',
  },
  MOON: {
    MAP: '/img/moonmap1k.jpg',
    BUMP: '/img/moonbump1k.jpg',
  },
  SUN: {
    MAP: '/img/sun.jpg',
  },
  SATELLITE: {
    OBJ: '/obj/Satelite.obj',
    MTL: '/obj/Satelite.mtl',
  },
  STAR: '/img/circle.png',
}

export const ANIMATION_CONFIG = {
  EARTH_ROTATION_SPEED: 0.0115,
  CLOUD_EXTRA_SPEED: 0.002,
  ORBITAL_SPEED: 0.0115 / 27,
  STARFIELD_SPEED: 0.0115 / 30,
  MOON_ROTATION_SPEED: 0.005,
  MOON_ORBITAL_SPEED: 0.0115 / 27,
  STAR_ROTATION_RATIO: 1 / 30,
}

export const UI_ELEMENTS = {
  INFO_PANELS: {
    EARTH: 'textoEarth',
    MOON: 'textoMoon',
    SUN: 'textoSun',
    SATELLITE: 'textoSatellite',
  },
}

export const STAR_FIELD_CONFIG = {
  NUM_STARS: 2000,
  STAR_SIZE: 0.1,
  MIN_RADIUS: 10,
  MAX_RADIUS: 50,
  POINT_SIZE: 0.1,
  HUE: 0.6,
  SATURATION: 0.5,
}
