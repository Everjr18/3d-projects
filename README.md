# Three.js Examples - React + TypeScript

Aplicación web interactiva con múltiples escenas 3D construida con Three.js, React, React Router y TypeScript.

## Características

- **🌍 Sistema Solar**: Exploración interactiva del sistema solar con Tierra, Luna, Sol y satélite
- **📦 Primitivas 3D**: Formas geométricas básicas y primitivas
- **💀 Objetos 3D**: Carga de modelos OBJ/MTL
- **🎮 Editor de Skin**: Personalización de skins de Minecraft
- **⚛️ React Router**: Navegación SPA (Single Page Application)
- **🎨 DaisyUI**: Interfaz moderna con Tailwind CSS
- **📱 Responsive**: Diseño adaptable a móviles y desktop

## Estructura del Proyecto

```
├── src/
│   ├── react/
│   │   ├── main.tsx           # Entry point de React
│   │   ├── App.tsx             # Router principal
│   │   ├── pages/              # Páginas/rutas
│   │   │   ├── Home.tsx
│   │   │   ├── SolarSystem.tsx
│   │   │   ├── Primitives.tsx
│   │   │   ├── Objects3D.tsx
│   │   │   └── MinecraftSkin.tsx
│   │   └── components/         # Componentes reutilizables
│   │       ├── Sidebar.tsx
│   │       ├── Controls.tsx
│   │       ├── InfoPanel.tsx
│   │       └── PreviewCanvas.tsx
│   ├── components/             # Componentes Three.js
│   │   ├── base/               # Componentes base OOP
│   │   ├── managers/           # Managers (SolarSystemManager, etc.)
│   │   ├── scene/              # Utilidades de escena
│   │   └── interaction/        # Raycasting e interacciones
│   ├── shaders/                # Shaders GLSL
│   └── config/                 # Configuración y constantes
├── public/
│   ├── js/                     # Scripts Three.js
│   │   ├── solar-system-react.ts  # Versión React del sistema solar
│   │   ├── primitives.ts
│   │   ├── objects-3d.ts
│   │   └── minecraft-skin.ts
│   ├── img/                    # Texturas
│   └── obj/                    # Modelos 3D
└── index.html                  # HTML principal (SPA)
```

## Tecnologías

- **Three.js** - Biblioteca 3D
- **React 18** - UI library
- **React Router DOM v6** - Client-side routing
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Utility-first CSS
- **DaisyUI** - Component library

## Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## Desarrollo

El servidor de desarrollo se inicia en `http://localhost:5173` (o siguiente puerto disponible).

### Rutas disponibles:

- `/` - Página principal con grid de proyectos
- `/solar-system` - Sistema solar interactivo
- `/primitives` - Primitivas 3D
- `/objects-3d` - Modelos 3D
- `/minecraft-skin` - Editor de skins

### Arquitectura React + Three.js

El proyecto usa un enfoque híbrido:

1. **React** maneja:
   - Routing (React Router)
   - UI components (Sidebar, Controls, etc.)
   - Estado de la aplicación
   - Eventos de usuario

2. **Three.js** maneja:
   - Escenas 3D
   - Renderizado
   - Animaciones
   - Físicas/interacciones 3D

3. **Comunicación**:
   - Se expone una API desde los scripts Three.js (`initScene()`)
   - React llama a métodos del API para controlar la escena
   - Ejemplo: `sceneRef.current.setSpeed(1.5)`

### Ejemplo: Añadir una nueva página

1. Crear el componente de página en `src/react/pages/MiPagina.tsx`:

```tsx
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function MiPagina() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    import('../../../public/js/mi-escena').then(() => {
      console.log('Scene loaded');
    });
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <div className="absolute top-4 left-4 z-10">
        <Link to="/" className="btn btn-sm btn-ghost">
          ← Inicio
        </Link>
      </div>
      <div ref={containerRef} id="canvas-container" className="flex-1" />
    </div>
  );
}
```

2. Añadir ruta en `src/react/App.tsx`:

```tsx
import MiPagina from './pages/MiPagina';

// ...
<Route path="/mi-pagina" element={<MiPagina />} />
```

3. Añadir card en `src/react/pages/Home.tsx`:

```tsx
<Link to="/mi-pagina" className="card ...">
  {/* contenido del card */}
</Link>
```

## Build para Producción

```bash
npm run build
```

Esto genera una carpeta `dist/` con:
- HTML, CSS y JS optimizados
- Assets procesados
- Todo listo para desplegar en cualquier hosting estático

### Deploy

Puedes desplegar en:
- **Vercel**: `vercel --prod`
- **Netlify**: Arrastra la carpeta `dist/`
- **GitHub Pages**: Configura el repositorio
- **Cualquier hosting estático**: Sube la carpeta `dist/`

## Próximas Mejoras

- [ ] Convertir Primitives, Objects3D y MinecraftSkin al patrón React + API
- [ ] Añadir transiciones entre rutas
- [ ] Modo oscuro/claro
- [ ] Persistencia de configuraciones (localStorage)
- [ ] Tests unitarios (Vitest)
- [ ] Tests E2E (Playwright)
- [ ] PWA support
- [ ] Lazy loading de escenas Three.js

## Changelog

### [2.0] - 2025-10-10
- Migración completa a React + React Router
- SPA (Single Page Application)
- Arquitectura híbrida React + Three.js
- Componentes reutilizables para UI
- Sistema de navegación con React Router

### [1.0] - 2025-01-12
- Version 0.0.1 release: Four 3d Object now available -> Earth, Moon, Sun, Satellite

## Licencia

MIT

## Autor

Proyecto de aprendizaje de Three.js + React
