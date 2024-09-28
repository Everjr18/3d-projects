// Configurar raycaster y vector de mouse
import * as THREE from 'three'

function checkIntersection(
  x: number,
  y: number,
  raycaster: THREE.Raycaster,
  camera: THREE.PerspectiveCamera,
  scene: THREE.Scene,
) {
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
    // Asegurarse de que el objeto intersectado sea un Mesh y tenga material
    console.log(intersects)
    for (const obj of intersects) {
      if (obj.object instanceof THREE.Mesh && obj.object.material) {
        const mat = obj.object.material.color
        if (mat) {
          const randomColor = Math.floor(Math.random() * 16777215).toString(16)

          // Asigna el color aleatorio al objeto
          obj.object.material.color.set(`#${randomColor}`)
        }

        console.log('Objeto clicado:', obj)
      } else {
        console.log('El objeto no es un Mesh o no tiene material.')
      }
    }
  }
}

export default checkIntersection
