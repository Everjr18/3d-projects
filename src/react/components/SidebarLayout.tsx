import { useState, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface SidebarLayoutProps {
  children: ReactNode;
}

export default function SidebarLayout({ children }: SidebarLayoutProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside
      id="sidebar"
      className={`h-screen bg-base-200 overflow-y-auto w-[400px] ${isOpen ? 'sidebar-open' : ''}`}
      style={{ flexShrink: 0 }}
    >
      <div className="p-6 space-y-4">
        {/* Header with home button and toggle button */}
        <div className="flex items-center justify-between">
          <Link to="/" className="btn btn-sm btn-ghost">
            ← Inicio
          </Link>

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

        <div className="flex flex-col gap-4 px-4">
          {/* Content provided by each route */}
          {children}
        </div>
      </div>
    </aside>
  );
}
