import { useState } from 'react';

export interface ControlsProps {
  onBrightnessChange: (value: number) => void;
  onSpeedChange: (value: number) => void;
  onFovChange: (value: number) => void;
  onAmbientLightChange: (value: number) => void;
  onDirectionalLightChange: (value: number) => void;
  onCloudsOpacityChange: (value: number) => void;
  onStarsSpeedChange: (value: number) => void;
  onAutoRotateChange: (value: boolean) => void;
}

export default function Controls(props: ControlsProps) {
  const [brightness, setBrightness] = useState(1.0);
  const [speed, setSpeed] = useState(1.0);
  const [fov, setFov] = useState(75);
  const [ambient, setAmbbi] = useState(0.3);
  const [directional, setDirectional] = useState(2.0);
  const [clouds, setClouds] = useState(0.8);
  const [stars, setStars] = useState(1.0);
  const [autoRotate, setAutoRotate] = useState(true);

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold">Controles</h3>

      {/* Brightness */}
      <div className="form-control">
        <label className="label">
          <span className="label-text text-xs">Brillo</span>
          <span className="label-text-alt text-xs">{brightness.toFixed(1)}</span>
        </label>
        <input
          type="range"
          min="0"
          max="2"
          step="0.1"
          value={brightness}
          className="range range-xs range-primary"
          onChange={(e) => {
            const val = parseFloat(e.target.value);
            setBrightness(val);
            props.onBrightnessChange(val);
          }}
        />
      </div>

      {/* Speed */}
      <div className="form-control">
        <label className="label">
          <span className="label-text text-xs">Velocidad de rotación</span>
          <span className="label-text-alt text-xs">{speed.toFixed(1)}x</span>
        </label>
        <input
          type="range"
          min="0"
          max="3"
          step="0.1"
          value={speed}
          className="range range-xs range-primary"
          onChange={(e) => {
            const val = parseFloat(e.target.value);
            setSpeed(val);
            props.onSpeedChange(val);
          }}
        />
      </div>

      {/* FOV */}
      <div className="form-control">
        <label className="label">
          <span className="label-text text-xs">Campo de visión</span>
          <span className="label-text-alt text-xs">{fov}°</span>
        </label>
        <input
          type="range"
          min="50"
          max="120"
          step="5"
          value={fov}
          className="range range-xs range-primary"
          onChange={(e) => {
            const val = parseInt(e.target.value);
            setFov(val);
            props.onFovChange(val);
          }}
        />
      </div>

      {/* Ambient Light */}
      <div className="form-control">
        <label className="label">
          <span className="label-text text-xs">Intensidad luz ambiental</span>
          <span className="label-text-alt text-xs">{ambient.toFixed(2)}</span>
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={ambient}
          className="range range-xs range-secondary"
          onChange={(e) => {
            const val = parseFloat(e.target.value);
            setAmbbi(val);
            props.onAmbientLightChange(val);
          }}
        />
      </div>

      {/* Directional Light */}
      <div className="form-control">
        <label className="label">
          <span className="label-text text-xs">Intensidad luz direccional</span>
          <span className="label-text-alt text-xs">{directional.toFixed(1)}</span>
        </label>
        <input
          type="range"
          min="0"
          max="5"
          step="0.1"
          value={directional}
          className="range range-xs range-secondary"
          onChange={(e) => {
            const val = parseFloat(e.target.value);
            setDirectional(val);
            props.onDirectionalLightChange(val);
          }}
        />
      </div>

      {/* Clouds Opacity */}
      <div className="form-control">
        <label className="label">
          <span className="label-text text-xs">Opacidad nubes</span>
          <span className="label-text-alt text-xs">{clouds.toFixed(2)}</span>
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={clouds}
          className="range range-xs range-accent"
          onChange={(e) => {
            const val = parseFloat(e.target.value);
            setClouds(val);
            props.onCloudsOpacityChange(val);
          }}
        />
      </div>

      {/* Stars Speed */}
      <div className="form-control">
        <label className="label">
          <span className="label-text text-xs">Velocidad estrellas</span>
          <span className="label-text-alt text-xs">{stars.toFixed(1)}x</span>
        </label>
        <input
          type="range"
          min="0"
          max="5"
          step="0.1"
          value={stars}
          className="range range-xs range-accent"
          onChange={(e) => {
            const val = parseFloat(e.target.value);
            setStars(val);
            props.onStarsSpeedChange(val);
          }}
        />
      </div>

      {/* Auto Rotate */}
      <div className="form-control">
        <label className="label cursor-pointer justify-start gap-2">
          <input
            type="checkbox"
            checked={autoRotate}
            className="checkbox checkbox-xs checkbox-primary"
            onChange={(e) => {
              const val = e.target.checked;
              setAutoRotate(val);
              props.onAutoRotateChange(val);
            }}
          />
          <span className="label-text text-xs">Auto-rotación cámara</span>
        </label>
      </div>
    </div>
  );
}
