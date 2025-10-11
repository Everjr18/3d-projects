import { useEffect, useRef } from 'react';

interface PreviewCanvasProps {
  objectName: string | null;
}

export default function PreviewCanvas({ objectName }: PreviewCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const initializedRef = useRef(false);

  // Initialize the preview scene once when canvas is available
  useEffect(() => {
    if (!canvasRef.current || initializedRef.current) return;

    const canvas = canvasRef.current;

    // Wait for createPreviewForObject to be available (retry every 100ms)
    const checkAndInit = () => {
      if ((window as any).createPreviewForObject) {
        (window as any).createPreviewForObject(null, canvas);
        initializedRef.current = true;
      } else {
        setTimeout(checkAndInit, 100);
      }
    };

    checkAndInit();

    return () => {
      initializedRef.current = false;
    };
  }, []);

  // Update the preview when objectName changes
  useEffect(() => {
    if (!objectName || !initializedRef.current) return;

    if ((window as any).createPreviewForObject) {
      (window as any).createPreviewForObject(objectName, canvasRef.current);
    }
  }, [objectName]);

  return (
    <div id="preview-container" className={objectName ? '' : 'hidden'}>
      <canvas
        ref={canvasRef}
        id="preview-canvas"
        className="w-full bg-black rounded-lg"
        style={{ height: '250px' }}
      />
    </div>
  );
}
