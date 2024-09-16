import * as THREE from 'three'
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

function checkIntersection(
  x: number,
  y: number,
  raycaster: THREE.Raycaster,
  camera: THREE.PerspectiveCamera,
  scene: THREE.Scene,
  control: OrbitControls,
) {
  const textoEarth = document.getElementById('textoEarth')
  const textoSun = document.getElementById('textoSun')
  const textoMoon = document.getElementById('textoMoon')
  const textoSatellite = document.getElementById('textoSatellite')

  // Función auxiliar para verificar si alguna ventana ya está visible
  const isAnyVisible = (): boolean | null => {
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
    let alreadyDisplayed = false // Bandera para verificar si se ha activado una ventana

    for (const obj of intersects) {
      if (obj.object instanceof THREE.Mesh) {
        if (!alreadyDisplayed) {
          const worldPosition = new THREE.Vector3()
          obj.object.getWorldPosition(worldPosition)
          console.log(worldPosition)
          // Solo si no se ha mostrado ninguna ventana
          if (obj.object.name === 'earthMesh' && textoEarth) {
            textoEarth.style.display = 'flex'
            alreadyDisplayed = true
            camera.position.set(
              worldPosition.x + 5,
              worldPosition.y + 2,
              worldPosition.z + 5,
            )
            camera.lookAt(worldPosition)
            control.target.copy(worldPosition)
            control.update()
          }
          if (obj.object.name === 'sunMesh' && textoSun) {
            textoSun.style.display = 'flex'
            alreadyDisplayed = true
            camera.position.set(
              worldPosition.x + 15,
              worldPosition.y + 6,
              worldPosition.z + 15,
            )
            camera.lookAt(worldPosition)
            control.target.copy(worldPosition)
            control.update()
          }
          if (obj.object.name === 'moonMesh' && textoMoon) {
            textoMoon.style.display = 'flex'
            alreadyDisplayed = true
            camera.position.set(
              worldPosition.x + 2,
              worldPosition.y + 2,
              worldPosition.z + 2,
            )
            camera.lookAt(worldPosition)
            control.target.copy(worldPosition)
            control.update()
          }
          if (obj.object.name === 'satelliteMesh' && textoSatellite) {
            textoSatellite.style.display = 'flex'
            alreadyDisplayed = true
            camera.position.set(
              worldPosition.x + 5,
              worldPosition.y + 2,
              worldPosition.z + 5,
            )
            camera.lookAt(worldPosition)
            control.target.copy(worldPosition)
            control.update()
          }
        }
      }
    }
  }
}

export default checkIntersection
