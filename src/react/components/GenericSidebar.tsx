import { useState, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface GenericSidebarProps {
  title: string;
  description: string;
  children?: ReactNode;
  showPreview?: boolean;
  previewCanvas?: ReactNode;
  infoContent?: ReactNode;
}

export default function GenericSidebar({
  title,
  description,
  children,
  showPreview = false,
  previewCanvas,
  infoContent
}: GenericSidebarProps) {
  const [isOpen, setIsOpen] = useState(true);

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
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-sm">{description}</p>
          </div>

          <div className="divider my-0"></div>

          {/* Preview Canvas */}
          {showPreview && previewCanvas && (
            <div id="preview-container">
              {previewCanvas}
            </div>
          )}

          {/* Info Container */}
          <div id="info-container">
            {infoContent || <p className="text-xs text-base-content/60">Selecciona un objeto para ver más información...</p>}
          </div>

          {/* Children (Controls, etc.) */}
          {children && (
            <>
              <div className="divider my-0"></div>
              {children}
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
