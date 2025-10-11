# Integración de React con Three.js

## Resumen

Este proyecto ahora incluye una versión con React que mantiene el código Three.js existente pero usa React para manejar la UI (sidebar, controles, etc.).

## Arquitectura Híbrida

La integración sigue el patrón **Opción 2** (React + Three.js Imperativo):
- **React** maneja la UI: componentes, estado, eventos
- **Three.js** se mantiene imperativo: escena, objetos 3D, animación
- **Comunicación** vía API expuesta desde solar-system-react.ts

## Estructura de Archivos

```
src/react/
├── main.tsx              # Entry point de React
├── App.tsx               # Componente principal que integra Three.js
└── components/
    ├── Sidebar.tsx       # Sidebar container
    ├── Controls.tsx      # Controles de la escena (sliders, checkbox)
    ├── InfoPanel.tsx     # Panel de información de objetos
    └── PreviewCanvas.tsx # Canvas de preview 3D

public/js/
├── solar-system.ts       # Versión original (sin React)
└── solar-system-react.ts # Versión adaptada para React (exporta initScene)
```

## Archivos HTML

- `solar-system.html` - Versión original sin React
- `solar-system-react.html` - Nueva versión con React

## Cómo Funciona

### 1. Inicialización

```tsx
// En App.tsx
useEffect(() => {
  import('../../public/js/solar-system-react').then((module) => {
    sceneRef.current = module.initScene(canvasContainerRef.current!)
  })
}, [])
```

### 2. API Expuesta

`solar-system-react.ts` exporta una función `initScene()` que retorna un objeto con métodos:

```typescript
interface SceneAPI {
  setBrightness: (value: number) => void
  setSpeed: (value: number) => void
  setFov: (value: number) => void
  setAmbientLight: (value: number) => void
  setDirectionalLight: (value: number) => void
  setCloudsOpacity: (value: number) => void
  setStarsSpeed: (value: number) => void
  setAutoRotate: (value: boolean) => void
  cleanup: () => void
}
```

### 3. Comunicación React → Three.js

```tsx
// En App.tsx
const handleSpeedChange = (value: number) => {
  if (sceneRef.current?.setSpeed) {
    sceneRef.current.setSpeed(value)
  }
}

// El callback se pasa a los componentes hijos
<Sidebar onSpeedChange={handleSpeedChange} ... />
```

### 4. Componentes React

#### Sidebar.tsx
- Container principal del sidebar
- Maneja el estado de apertura/cierre
- Contiene PreviewCanvas, InfoPanel y Controls

#### Controls.tsx
- Todos los sliders y controles
- Maneja estado local de cada control
- Llama callbacks cuando cambia un valor

#### InfoPanel.tsx
- Muestra información de objetos celestes
- Datos estáticos en un objeto `objectInfo`

#### PreviewCanvas.tsx
- Canvas separado para preview 3D
- Se conecta con el código Three.js existente

## Ventajas de este Enfoque

1. **Migración gradual**: No necesitas reescribir todo el código Three.js
2. **Separación de responsabilidades**: React maneja UI, Three.js maneja 3D
3. **Reutilización**: El código Three.js existente se mantiene casi intacto
4. **Facilidad**: Más simple que React Three Fiber para proyectos existentes
5. **Flexibilidad**: Puedes migrar a R3F gradualmente si lo deseas

## Modificaciones Realizadas

### UIController.ts
Se añadieron setters para permitir control desde React:
```typescript
setRotationSpeed(speed: number): void
setStarsSpeed(speed: number): void
setAutoRotateCamera(value: boolean): void
```

### SolarSystemManager.ts
No se modificó. El container se asigna mediante ID temporalmente.

### AnimationLoop.ts
No se modificó. Ya tenía el método `stop()` para cleanup.

## Uso

### Desarrollo
```bash
npm run dev
```

Accede a:
- Versión original: `http://localhost:5174/solar-system.html`
- Versión React: `http://localhost:5174/solar-system-react.html`

### Build
```bash
npm run build
```

Ambas versiones se incluyen en el build de producción.

## Próximos Pasos (Opcional)

Si quieres mejorar la integración:

1. **Estado global**: Usar Context API o Zustand para manejar estado de objetos seleccionados
2. **Eventos Three.js → React**: Emitir eventos desde Three.js cuando se selecciona un objeto
3. **TypeScript strict**: Tipar mejor la interfaz SceneAPI
4. **Migración a R3F**: Convertir gradualmente componentes a React Three Fiber

## Notas

- El código Three.js original sigue funcionando sin cambios
- La versión React es completamente independiente
- Ambas versiones pueden coexistir
- Los componentes React pueden ser reutilizados en otros proyectos
