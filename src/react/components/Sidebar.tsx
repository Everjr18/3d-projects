import { useState } from 'react';
import { Link } from 'react-router-dom';
import Controls from './Controls';
import InfoPanel from './InfoPanel';
import PreviewCanvas from './PreviewCanvas';

export interface SidebarProps {
  onBrightnessChange: (value: number) => void;
  onSpeedChange: (value: number) => void;
  onFovChange: (value: number) => void;
  onAmbientLightChange: (value: number) => void;
  onDirectionalLightChange: (value: number) => void;
  onCloudsOpacityChange: (value: number) => void;
  onStarsSpeedChange: (value: number) => void;
  onAutoRotateChange: (value: boolean) => void;
}

export default function Sidebar(props: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedObject, setSelectedObject] = useState<string | null>(null);

  return (
    <aside
      id="sidebar"
      className={`h-screen bg-base-200 overflow-y-auto w-[400px] ${isOpen ? 'sidebar-open' : ''}`}
      style={{ flexShrink: 0 }}
    >
      <div className="p-6 space-y-4">
        <Link to="/" className="btn btn-sm btn-ghost mb-2">
          ← Inicio
        </Link>

        <div className="flex flex-col gap-4 px-4">
          {/* Toggle Button */}
          <div className="flex justify-end">
            <button
              id="sidebar-toggle"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
              style={{
                background: 'rgba(0,0,0,0.6)',
                border: '2px solid rgba(255,255,255,0.3)',
                borderRadius: '50%',
                width: '48px',
                height: '48px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                style={{ width: '24px', height: '24px', stroke: 'white', strokeWidth: 2 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Title and Description */}
          <div>
            <h1 className="text-2xl font-bold">El Sistema Solar</h1>
            <p className="text-sm">
              Explora nuestro sistema solar interactivo. Haz clic en los objetos celestes para obtener más información.
            </p>
          </div>

          <div className="divider my-0"></div>

          {/* Preview Canvas */}
          <PreviewCanvas objectName={selectedObject} />

          {/* Info Container */}
          <InfoPanel selectedObject={selectedObject} />

          <div className="divider my-0"></div>

          {/* Controls */}
          <Controls {...props} />
        </div>
      </div>
    </aside>
  );
}

// Expose function to update selected object from Three.js code
(window as any).setSelectedObject = (objectName: string | null) => {
  // This will be handled via React state management
};
