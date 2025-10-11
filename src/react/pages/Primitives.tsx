import { useEffect, useRef, useState } from 'react';
import SidebarLayout from '../components/SidebarLayout';
import Controls from '../components/Controls';
import PreviewCanvas from '../components/PreviewCanvas';

export default function Primitives() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<any>(null);
  const [selectedObject, setSelectedObject] = useState<string | null>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current || initializedRef.current) return;

    initializedRef.current = true;

    // Exponer función global para que Three.js pueda actualizar el estado de React
    (window as any).setSelectedObject = (objectName: string | null) => {
      setSelectedObject(objectName);
    };

    import('../../../public/js/primitives-react').then((module) => {
      if (module.initScene) {
        sceneRef.current = module.initScene(containerRef.current!);
      }
    }).catch((error) => {
      console.error('Error loading primitives:', error);
    });

    return () => {
      if (sceneRef.current?.cleanup) {
        sceneRef.current.cleanup();
      }
      delete (window as any).setSelectedObject;
      delete (window as any).createPreviewForObject;
    };
  }, []);

  const handleBrightnessChange = (value: number) => {
    if (sceneRef.current?.setBrightness) {
      sceneRef.current.setBrightness(value);
    }
  };

  const handleSpeedChange = (value: number) => {
    if (sceneRef.current?.setSpeed) {
      sceneRef.current.setSpeed(value);
    }
  };

  const handleFovChange = (value: number) => {
    if (sceneRef.current?.setFov) {
      sceneRef.current.setFov(value);
    }
  };

  const handleAmbientLightChange = (value: number) => {
    if (sceneRef.current?.setAmbientLight) {
      sceneRef.current.setAmbientLight(value);
    }
  };

  const handleDirectionalLightChange = (value: number) => {
    if (sceneRef.current?.setDirectionalLight) {
      sceneRef.current.setDirectionalLight(value);
    }
  };

  const handleCloudsOpacityChange = (value: number) => {
    if (sceneRef.current?.setCloudsOpacity) {
      sceneRef.current.setCloudsOpacity(value);
    }
  };

  const handleStarsSpeedChange = (value: number) => {
    if (sceneRef.current?.setStarsSpeed) {
      sceneRef.current.setStarsSpeed(value);
    }
  };

  const handleAutoRotateChange = (value: boolean) => {
    if (sceneRef.current?.setAutoRotate) {
      sceneRef.current.setAutoRotate(value);
    }
  };

  return (
    <div className="flex flex-row font-mono text-sm">
      <SidebarLayout>
        <div>
          <h1 className="text-2xl font-bold">Primitivas 3D</h1>
          <p className="text-sm">Formas geométricas básicas. Haz clic en los objetos para verlos en detalle.</p>
        </div>

        <div className="divider my-0"></div>

        <PreviewCanvas objectName={selectedObject} />

        <div className="divider my-0"></div>

        <Controls
          onBrightnessChange={handleBrightnessChange}
          onSpeedChange={handleSpeedChange}
          onFovChange={handleFovChange}
          onAmbientLightChange={handleAmbientLightChange}
          onDirectionalLightChange={handleDirectionalLightChange}
          onCloudsOpacityChange={handleCloudsOpacityChange}
          onStarsSpeedChange={handleStarsSpeedChange}
          onAutoRotateChange={handleAutoRotateChange}
        />
      </SidebarLayout>
      <div ref={containerRef} id="canvas-container" className="h-screen relative flex-1" />
    </div>
  );
}
