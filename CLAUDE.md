# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Three.js-based interactive Solar System visualization that displays Earth, Moon, Sun, and a Satellite in 3D with clickable information panels. The application uses TypeScript, Vite for development/building, and Tailwind CSS with DaisyUI for styling.

The UI is in Spanish ("El Sistema Solar") with a sidebar containing object information and interactive controls for scene parameters (brightness, rotation speed, FOV, lighting, cloud opacity, star speed, and camera auto-rotation).

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
- Raycasting detects clicks on celestial bodies (`checkIntersection` in `src/components/checkIntersection.ts`)
- Each object has a named mesh (e.g., `earthMesh`, `moonMesh`, `sunMesh`, `satelliteMesh`)
- Clicking an object:
  1. Shows info from HTML templates (`earth-info`, `moon-info`, `sun-info`, `satellite-info`) in the `info-container` sidebar element
  2. Shows a rotating preview of the object in a separate canvas (`preview-canvas`) using the PreviewScene class
  3. Animates camera to focus on the object with predefined offsets
  4. Updates OrbitControls target to the clicked object's world position

### Earth Rendering
Earth uses multiple layered meshes:
- Base surface with diffuse, specular, and bump maps
- City lights layer (additive blending)
- Clouds layer (slightly larger scale with alpha transparency)
- Atmospheric glow using Fresnel shader (`getFresnelMat`)

### Animation
Main animation loop in `public/js/main.ts`:
- Earth rotates on its axis (configurable speed via slider)
- Clouds rotate slightly faster than surface (`speed + 0.002`)
- Earth-Moon system orbits together (`earthGroup.rotateOnAxis`)
- Star field slowly counter-rotates (`speed / 30`)

### UI and Controls
- **Sidebar**: Fixed 400px width on the left containing info panels and controls
- **Canvas**: Fills remaining viewport space (`window.innerWidth - 400`)
- **DaisyUI components** styled with Tailwind CSS (theme: "forest")
- **HTML templates**: Info content stored as `<template>` elements, cloned on click
- **Live controls** (sliders and checkbox):
  - Brightness (tone mapping exposure)
  - Rotation speed multiplier
  - Camera FOV
  - Ambient light intensity
  - Directional light intensity
  - Cloud opacity
  - Star rotation speed
  - Auto-rotate camera toggle

### Satellite Rendering
The satellite uses OBJ/MTL model loading:
- Models located in `/obj/Satelite.obj` and `/obj/Satelite.mtl`
- Uses `OBJLoader` and `MTLLoader` from Three.js addons
- Materials set to `DoubleSide` to prevent culling issues
- Scaled down to 0.05 and rotated for proper display

### Preview Scene
Separate mini-scene in the sidebar (`createPreviewScene.ts`):
- Independent Three.js scene, camera, and renderer
- Recreates clicked object with same materials/layers
- Provides isolated rotating view of selected celestial body
- Async loading for satellite model

## File Structure
```
├── public/
│   ├── js/
│   │   └── main.ts              # Main entry point, animation loop, UI event handlers
│   ├── img/                     # Textures (earth, moon, sun maps)
│   ├── obj/                     # 3D models (Satelite.obj/mtl)
│   └── css/style.css
├── src/
│   ├── components/
│   │   ├── base/                # New OOP base components (not yet integrated)
│   │   ├── entities/            # New OOP entity classes (not yet integrated)
│   │   ├── create*.ts           # Factory functions (CURRENTLY ACTIVE)
│   │   ├── checkIntersection.ts # Raycasting and click handling
│   │   └── createPreviewScene.ts # Sidebar preview renderer
│   ├── shaders/
│   │   ├── getFresnelMat.ts     # Atmospheric glow shader
│   │   └── getSunMaterial.ts    # Sun shader material
│   ├── config/
│   │   └── constants.ts         # Centralized config (for new architecture)
│   └── utils/
│       └── EventEmitter.ts      # Event system (for new architecture)
├── index.html                   # HTML structure, sidebar UI, templates
└── package.json
```
