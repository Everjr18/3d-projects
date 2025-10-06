import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export const Navbar: React.FC = () => {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Inicio', icon: '🏠' },
    { path: '/earth', label: 'Tierra', icon: '🌍' },
    { path: '/moon', label: 'Luna', icon: '🌙' },
    { path: '/sun', label: 'Sol', icon: '☀️' },
    { path: '/satellite', label: 'Satélite', icon: '🛰️' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-[9999] bg-black/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-lg font-semibold text-white hover:text-gray-300 transition-colors">
            Sistema Solar
          </Link>

          {/* Navigation */}
          <ul className="flex items-center gap-6">
            {navItems.map(item => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`
                    text-sm flex items-center gap-2 transition-colors
                    ${
                      location.pathname === item.path
                        ? 'text-white font-medium'
                        : 'text-gray-400 hover:text-white'
                    }
                  `}
                >
                  <span>{item.icon}</span>
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}
