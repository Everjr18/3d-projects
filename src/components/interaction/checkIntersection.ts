import * as THREE from 'three'
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import type PreviewScene from '../scene/createPreviewScene'

function checkIntersection(
  x: number,
  y: number,
  raycaster: THREE.Raycaster,
  camera: THREE.PerspectiveCamera,
  scene: THREE.Scene,
  control: OrbitControls,
  previewScene: PreviewScene | null = null,
) {
  const infoContainer = document.getElementById('info-container')
  const previewContainer = document.getElementById('preview-container')

  // Actualizar las coordenadas del mouse
  // Ajustar x para el canvas (después del sidebar en desktop, 0 en mobile)
  const sidebarWidth = window.innerWidth > 768 ? 400 : 0
  const canvasWidth = window.innerWidth - sidebarWidth
  const mouse = new THREE.Vector2()
  mouse.x = ((x - sidebarWidth) / canvasWidth) * 2 - 1
  mouse.y = -(y / window.innerHeight) * 2 + 1

  // Actualizar el raycaster con la cámara y la posición del mouse
  raycaster.setFromCamera(mouse, camera)

  // Calcular los objetos que intersectan con el rayo
  const intersects = raycaster.intersectObjects(scene.children, true) // true para buscar en objetos hijos

  // Si se hace clic en un objeto, mostrar info en el sidebar
  if (intersects.length > 0 && infoContainer) {
    for (const obj of intersects) {
      if (obj.object instanceof THREE.Mesh) {
        const worldPosition = new THREE.Vector3()
        obj.object.getWorldPosition(worldPosition)

        let templateId = ''
        let cameraOffset = { x: 5, y: 2, z: 5 }

        if (obj.object.name === 'earthMesh') {
          templateId = 'earth-info'
          cameraOffset = { x: 5, y: 2, z: 5 }
        } else if (obj.object.name === 'sunMesh') {
          templateId = 'sun-info'
          cameraOffset = { x: 15, y: 6, z: 15 }
        } else if (obj.object.name === 'moonMesh') {
          templateId = 'moon-info'
          cameraOffset = { x: 2, y: 2, z: 2 }
        } else if (obj.object.name === 'satelliteMesh') {
          templateId = 'satellite-info'
          cameraOffset = { x: 5, y: 2, z: 5 }
        } else if (obj.object.name === 'skullMesh') {
          templateId = 'skull-info'
          cameraOffset = { x: 8, y: 3, z: 8 }
        }

        if (templateId) {
          const template = document.getElementById(templateId) as HTMLTemplateElement
          if (template) {
            infoContainer.innerHTML = ''
            const content = template.content.cloneNode(true)
            infoContainer.appendChild(content)
          }

          // Show preview
          if (previewScene && previewContainer) {
            previewContainer.classList.remove('hidden')
            previewScene.showObject(obj.object.name)
          }

          camera.position.set(
            worldPosition.x + cameraOffset.x,
            worldPosition.y + cameraOffset.y,
            worldPosition.z + cameraOffset.z,
          )
          camera.lookAt(worldPosition)
          control.target.copy(worldPosition)
          control.update()

          break
        }
      }
    }
  }
}

export default checkIntersection
