import React, { useRef, useEffect } from 'react'
import { useThreeJS } from '../../hooks/useThreeJS'

interface SolarSystemCanvasProps {
  className?: string
  focusTarget?: string
}

export const SolarSystemCanvas: React.FC<SolarSystemCanvasProps> = ({
  className = 'w-full h-screen',
  focusTarget,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { isLoading, error } = useThreeJS({ containerRef, focusTarget })

  useEffect(() => {
    // Handle window resize
    const handleResize = () => {
      if (containerRef.current) {
        // The Three.js app handles resize internally
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (error) {
    return (
      <div className={`${className} flex items-center justify-center bg-black text-white`}>
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Error loading Solar System</h2>
          <p className="text-gray-300">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`${className} relative`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black text-white z-10">
          <div className="text-center">
            <div className="loading loading-spinner loading-lg mb-4"></div>
            <p>Loading Solar System...</p>
          </div>
        </div>
      )}
      <div ref={containerRef} className="w-full h-full" style={{ cursor: 'grab' }} />
    </div>
  )
}
