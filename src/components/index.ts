/**
 * Components Index
 * Exports all basic components and entities
 */

// Basic components
export { MeshComponent } from './base/MeshComponent'
export { TexturedSphereComponent } from './base/TexturedSphereComponent'
export type { TexturedSphereConfig } from './base/TexturedSphereComponent'
export { LayeredMeshComponent } from './base/LayeredMeshComponent'
export type { LayerConfig } from './base/LayeredMeshComponent'
export { RotationComponent } from './base/RotationComponent'
export type { RotationConfig } from './base/RotationComponent'
export { OrbitalComponent } from './base/OrbitalComponent'
export type { OrbitalConfig } from './base/OrbitalComponent'

// Entities
export { CelestialBody } from './entities/CelestialBody'
export type { CelestialBodyConfig } from './entities/CelestialBody'
export { Earth } from './entities/Earth'
export { Moon } from './entities/Moon'
export { Sun } from './entities/Sun'
export { Satellite } from './entities/Satellite'
export { StarField } from './entities/StarField'
