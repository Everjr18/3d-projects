import { useEffect, useRef, useState } from 'react';
import SidebarLayout from '../components/SidebarLayout';
import Controls from '../components/Controls';
import InfoPanel from '../components/InfoPanel';
import PreviewCanvas from '../components/PreviewCanvas';

export default function SolarSystem() {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<any>(null);
  const [selectedObject, setSelectedObject] = useState<string | null>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!canvasContainerRef.current || initializedRef.current) return;

    initializedRef.current = true;

    // Exponer función global para que Three.js pueda actualizar el estado de React
    (window as any).setSelectedObject = (objectName: string | null) => {
      setSelectedObject(objectName);
    };

    import('../../../public/js/solar-system-react').then((module) => {
      if (module.initScene) {
        sceneRef.current = module.initScene(canvasContainerRef.current!);
      }
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
          <h1 className="text-2xl font-bold">El Sistema Solar</h1>
          <p className="text-sm">
            Explora nuestro sistema solar interactivo. Haz clic en los objetos celestes para obtener más información.
          </p>
        </div>

        <div className="divider my-0"></div>

        <PreviewCanvas objectName={selectedObject} />

        <InfoPanel selectedObject={selectedObject} />

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
      <div ref={canvasContainerRef} id="canvas-container" className="h-screen relative flex-1" />
    </div>
  );
}
