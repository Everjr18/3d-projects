// Configurar raycaster y vector de mouse
import * as THREE from 'three'

function checkIntersection(
  x: number,
  y: number,
  raycaster: THREE.Raycaster,
  camera: THREE.PerspectiveCamera,
  scene: THREE.Scene,
) {
  const textoEarth = document.getElementById('textoEarth')
  const textoSun = document.getElementById('textoSun')
  const textoMoon = document.getElementById('textoMoon')
  const textoSatellite = document.getElementById('textoSatellite')

  // Función auxiliar para verificar si alguna ventana ya está visible
  const isAnyVisible = (): boolean => {
    return (
      (textoEarth && textoEarth.style.display === 'flex') ||
      (textoSun && textoSun.style.display === 'flex') ||
      (textoMoon && textoMoon.style.display === 'flex') ||
      (textoSatellite && textoSatellite.style.display === 'flex')
    )
  }

  // Si alguna ventana está visible, no hacemos nada
  if (isAnyVisible()) {
    return
  }

  // Actualizar las coordenadas del mouse
  const mouse = new THREE.Vector2()
  mouse.x = (x / window.innerWidth) * 2 - 1
  mouse.y = -(y / window.innerHeight) * 2 + 1

  // Actualizar el raycaster con la cámara y la posición del mouse
  raycaster.setFromCamera(mouse, camera)

  // Calcular los objetos que intersectan con el rayo
  const intersects = raycaster.intersectObjects(scene.children, true) // true para buscar en objetos hijos

  // Si se hace clic en un objeto, cambiar el color del objeto
  if (intersects.length > 0) {
    for (const obj of intersects) {
      if (obj.object instanceof THREE.Mesh) {
        if (obj.object.name === 'earthMesh' && textoEarth)
          textoEarth.style.display = 'flex'
        if (obj.object.name === 'sunMesh' && textoSun)
          textoSun.style.display = 'flex'
        if (obj.object.name === 'moonMesh' && textoMoon)
          textoMoon.style.display = 'flex'
        if (obj.object.name === 'satelliteMesh' && textoSatellite)
          textoSatellite.style.display = 'flex'

        console.log(obj.object.name)
      }
    }
  }
}

export default checkIntersection
