import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SolarSystem from './pages/SolarSystem';
import Primitives from './pages/Primitives';
import Objects3D from './pages/Objects3D';
import MinecraftSkin from './pages/MinecraftSkin';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/solar-system" element={<SolarSystem />} />
        <Route path="/primitives" element={<Primitives />} />
        <Route path="/objects-3d" element={<Objects3D />} />
        <Route path="/minecraft-skin" element={<MinecraftSkin />} />
      </Routes>
    </BrowserRouter>
  );
}
