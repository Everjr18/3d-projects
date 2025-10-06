# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Three.js-based interactive Solar System visualization that displays Earth, Moon, Sun, and a Satellite in 3D with clickable information panels. The application uses TypeScript, Vite for development/building, and Tailwind CSS with DaisyUI for styling.

## Development Commands

- `npm run dev` - Start development server with Vite
- `npm run build` - Build for production (runs TypeScript compiler then Vite build)
- `npm run preview` - Preview production build locally

## Architecture

The codebase is in transition between two architectural approaches:

### Current/Active Architecture (Factory Functions)
The main application currently uses factory functions located in `src/components/`:
- `createEarth()`, `createMoon()`, `createSun()`, `createSatellite()` - Factory functions that create celestial bodies
- `createStarfield()` - Creates the background star field
- `createCamera()`, `createRenderer()`, `createLights()` - Scene setup utilities
- `checkIntersection()` - Raycasting and click handling for object interaction

Entry point: `public/js/main.ts` initializes the scene, creates all objects, and runs the animation loop.

### New Architecture (OOP/Component-Based)
A new component-based architecture exists in `src/components/` with:
- **Base Components** (`src/components/base/`):
  - `MeshComponent` - Base class for Three.js meshes
  - `TexturedSphereComponent` - Sphere with texture support
  - `LayeredMeshComponent` - Multiple layers on a single object (e.g., Earth surface + clouds + glow)
  - `RotationComponent` - Manages rotation animations
  - `OrbitalComponent` - Handles orbital mechanics

- **Entities** (`src/components/entities/`):
  - `CelestialBody` - Abstract base class for all celestial objects
  - `Earth`, `Moon`, `Sun`, `Satellite`, `StarField` - Concrete implementations

This new architecture is **not yet integrated** into the main application. When working with the new components, be aware they use:
- Promise-based async `create()` methods
- Event-driven communication via `EventEmitter`
- Configuration objects for initialization
- Centralized constants (would be in `src/config/constants.ts`)

## Key Implementation Details

### Interaction System
- Raycasting detects clicks on celestial bodies
- Each object has a named mesh (e.g., `earthMesh`, `moonMesh`, `sunMesh`, `satelliteMesh`)
- Clicking an object:
  1. Shows an info panel (`textoEarth`, `textoMoon`, etc.)
  2. Animates camera to focus on the object
  3. Updates OrbitControls target

### Earth Rendering
Earth uses multiple layered meshes:
- Base surface with diffuse, specular, and bump maps
- City lights layer (additive blending)
- Clouds layer (slightly larger scale with alpha transparency)
- Atmospheric glow using Fresnel shader (`getFresnelMat`)

### Animation
Main animation loop in `public/js/main.ts`:
- Earth rotates on its axis
- Clouds rotate slightly faster than surface
- Earth-Moon system orbits together
- Star field slowly counter-rotates

### UI
- DaisyUI components styled with Tailwind CSS
- Info panels positioned absolutely with `id` attributes
- Close buttons hide panels by changing `display` style

## File Structure
```
├── public/
│   ├── js/main.ts          # Main entry point
│   ├── img/                # Textures and images
│   └── css/style.css       # Styles
├── src/
│   ├── components/         # Factory functions + new component system
│   ├── shaders/            # Custom shaders (Fresnel, Sun material)
│   └── vite-env.d.ts
├── index.html              # HTML with UI panels
└── package.json
```
