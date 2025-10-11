import React, { useEffect, useRef } from 'react';
import SidebarLayout from '../components/SidebarLayout';

export default function MinecraftSkin() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<any>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current || initializedRef.current) return;

    initializedRef.current = true;

    import('../../../public/js/minecraft-skin-react')
      .then((module) => {
        if (module.initScene) {
          sceneRef.current = module.initScene(containerRef.current!);
        }
      })
      .catch((error) => {
        console.error('Error loading minecraft-skin:', error);
      });

    return () => {
      if (sceneRef.current?.cleanup) {
        sceneRef.current.cleanup();
      }
    };
  }, []);

  return (
    <div className="flex flex-row font-mono text-sm">
      <SidebarLayout>
        {/* Title and Description */}
        <div>
          <h1 className="text-2xl font-bold">Editor de Skin</h1>
        </div>

        {/* Skin Info */}
        <div className="space-y-2 text-sm">
          <p>📦 Modelo basado en el formato clásico de Minecraft</p>
        </div>

        <div className="divider my-0"></div>

        {/* Overlay Layers */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold">Capas Overlay (Segunda Capa)</h3>
          <p className="text-xs text-base-content/60 mb-2">
            Las capas overlay se superponen sobre la base. Usa los checkboxes
            para mostrar u ocultar cada capa.
          </p>

          <div className="form-control">
            <label className="label cursor-pointer justify-start gap-2">
              <input
                type="checkbox"
                defaultChecked
                className="checkbox checkbox-xs checkbox-primary"
                id="head-overlay-enabled"
              />
              <span className="label-text text-xs">🎩 Sombrero/Casco</span>
            </label>
          </div>

          <div className="form-control">
            <label className="label cursor-pointer justify-start gap-2">
              <input
                type="checkbox"
                defaultChecked
                className="checkbox checkbox-xs checkbox-primary"
                id="body-overlay-enabled"
              />
              <span className="label-text text-xs">🧥 Chaqueta</span>
            </label>
          </div>

          <div className="form-control">
            <label className="label cursor-pointer justify-start gap-2">
              <input
                type="checkbox"
                defaultChecked
                className="checkbox checkbox-xs checkbox-primary"
                id="arms-overlay-enabled"
              />
              <span className="label-text text-xs">👔 Mangas</span>
            </label>
          </div>

          <div className="form-control">
            <label className="label cursor-pointer justify-start gap-2">
              <input
                type="checkbox"
                defaultChecked
                className="checkbox checkbox-xs checkbox-primary"
                id="legs-overlay-enabled"
              />
              <span className="label-text text-xs">👔 Pantalones Overlay</span>
            </label>
          </div>
        </div>

        <div className="divider my-0"></div>

        {/* Import/Export */}
        <div>
          <h3 className="text-sm font-bold">Importar/Exportar Skin</h3>
          <p className="text-xs text-base-content/60 mb-2">
            Carga o descarga tu skin en formato PNG
          </p>

          <button
            className="btn btn-sm btn-primary w-full mb-2"
            id="import-skin"
          >
            📁 Importar Skin PNG
          </button>

          <button className="btn btn-sm btn-success w-full" id="download-skin">
            💾 Exportar Skin (64x64)
          </button>

          <input
            type="file"
            id="skin-file-input"
            accept="image/png"
            style={{ display: 'none' }}
          />
        </div>

        <div className="divider my-0"></div>

        {/* Animation Controls */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold">Animación</h3>

          <div className="form-control">
            <label className="label cursor-pointer justify-start gap-2">
              <input
                type="checkbox"
                defaultChecked
                className="checkbox checkbox-xs checkbox-primary"
                id="walk-animation"
              />
              <span className="label-text text-xs">Animación de caminar</span>
            </label>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-xs">Velocidad de animación</span>
              <span
                className="label-text-alt text-xs"
                id="animation-speed-value"
              >
                1.0x
              </span>
            </label>
            <input
              type="range"
              min="0"
              max="3"
              step="0.1"
              defaultValue="1.0"
              className="range range-xs range-primary"
              id="animation-speed-slider"
            />
          </div>
        </div>

        <div className="divider my-0"></div>

        {/* Camera Controls */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold">Cámara</h3>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-xs">Campo de visión</span>
              <span className="label-text-alt text-xs" id="fov-value">
                75°
              </span>
            </label>
            <input
              type="range"
              min="50"
              max="120"
              step="5"
              defaultValue="75"
              className="range range-xs range-primary"
              id="fov-slider"
            />
          </div>

          <div className="form-control">
            <label className="label cursor-pointer justify-start gap-2">
              <input
                type="checkbox"
                defaultChecked
                className="checkbox checkbox-xs checkbox-primary"
                id="auto-rotate-checkbox"
              />
              <span className="label-text text-xs">Auto-rotación cámara</span>
            </label>
          </div>
        </div>

        <div className="divider my-0"></div>

        {/* Lighting */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold">Iluminación</h3>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-xs">
                Intensidad luz ambiental
              </span>
              <span className="label-text-alt text-xs" id="ambient-value">
                0.5
              </span>
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              defaultValue="0.5"
              className="range range-xs range-secondary"
              id="ambient-slider"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-xs">
                Intensidad luz direccional
              </span>
              <span className="label-text-alt text-xs" id="directional-value">
                1.5
              </span>
            </label>
            <input
              type="range"
              min="0"
              max="5"
              step="0.1"
              defaultValue="1.5"
              className="range range-xs range-secondary"
              id="directional-slider"
            />
          </div>
        </div>
      </SidebarLayout>

      {/* Canvas Container */}
      <div
        ref={containerRef}
        id="canvas-container"
        className="h-screen relative flex-1"
      />
    </div>
  );
}
