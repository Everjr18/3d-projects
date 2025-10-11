import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-base-300">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">Three.js Examples</h1>
        <p className="text-lg text-base-content/70">Explora diferentes escenas interactivas en 3D</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
        {/* Solar System Card */}
        <Link to="/solar-system" className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
          <div className="card-body">
            <h2 className="card-title text-2xl">
              <span className="text-3xl">🌍</span>
              Sistema Solar
            </h2>
            <p className="text-base-content/70">
              Explora nuestro sistema solar interactivo con la Tierra, la Luna, el Sol y un satélite.
            </p>
            <div className="card-actions justify-end mt-4">
              <button className="btn btn-primary btn-sm">Ver →</button>
            </div>
          </div>
        </Link>

        {/* Primitives Card */}
        <Link to="/primitives" className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
          <div className="card-body">
            <h2 className="card-title text-2xl">
              <span className="text-3xl">📦</span>
              Primitivas 3D
            </h2>
            <p className="text-base-content/70">
              Formas geométricas básicas: cubos, cilindros y otras primitivas.
            </p>
            <div className="card-actions justify-end mt-4">
              <button className="btn btn-primary btn-sm">Ver →</button>
            </div>
          </div>
        </Link>

        {/* 3D Objects Card */}
        <Link to="/objects-3d" className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
          <div className="card-body">
            <h2 className="card-title text-2xl">
              <span className="text-3xl">💀</span>
              Objetos 3D
            </h2>
            <p className="text-base-content/70">
              Modelos 3D cargados desde archivos OBJ y MTL.
            </p>
            <div className="card-actions justify-end mt-4">
              <button className="btn btn-primary btn-sm">Ver →</button>
            </div>
          </div>
        </Link>

        {/* Minecraft Skin Editor Card */}
        <Link to="/minecraft-skin" className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
          <div className="card-body">
            <h2 className="card-title text-2xl">
              <span className="text-3xl">🎮</span>
              Editor de Skin
            </h2>
            <p className="text-base-content/70">
              Personaliza tu skin de Minecraft con colores y animaciones.
            </p>
            <div className="card-actions justify-end mt-4">
              <button className="btn btn-primary btn-sm">Ver →</button>
            </div>
          </div>
        </Link>
      </div>

      <div className="text-center mt-12 text-base-content/50">
        <p className="text-xs">Construido con Three.js, React y TypeScript</p>
      </div>
    </div>
  );
}
