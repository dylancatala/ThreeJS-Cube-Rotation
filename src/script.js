import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import gsap from 'gsap';
import * as lil from 'lil-gui';



// Textures
const loadingManager = new THREE.LoadingManager()

loadingManager.onStart = () => {
  console.log('onStart')
}

loadingManager.onLoad = () => {
  console.log('onLoad')
}

loadingManager.onProgress = () => {
  console.log('onProgress')
}

loadingManager.onError = () => {
  console.log('onError')
}

const textureLoader = new THREE.TextureLoader(loadingManager)
const colorTexture = textureLoader.load('/textures/door/color.jpg')
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')


// Debug
const debug = new lil.GUI()

const parameters = {
  spin: () => {
    gsap.to(mesh.rotation, { duration: 2.8, x: mesh.rotation.x + Math.PI * 2 })
    gsap.to(mesh.rotation, { duration: 3, y: mesh.rotation.y + Math.PI * 2 })
    gsap.to(mesh.rotation, { duration: 2.5, z: mesh.rotation.z + Math.PI * 2 })
  }
}

// Cursor
const cursor = {
  x: 0,
  y: 0
}
window.addEventListener('mousemove', (event) => {
  cursor.x = event.clientX / sizes.width - 0.5
  cursor.y = - (event.clientY / sizes.height - 0.5)
})



// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1, 4, 4, 4)


// const geometry = new THREE.BufferGeometry()
// const count = 50;
// const positionsArray = new Float32Array(count * 3 * 3)
// for (let i = 0; i < count * 3 * 3; i++) {
//   positionsArray[i] = (Math.random() - 0.5 * 4)
// }
// const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
// geometry.setAttribute('position', positionsAttribute)



const material = new THREE.MeshBasicMaterial({
  map: colorTexture,
  wireframe: true
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)


// Debug tweak
debug.add(mesh.position, 'y', - 3, 3, 0.01)
debug.add(mesh.position, 'x', - 3, 3, 0.01)
debug.add(mesh.position, 'z', - 3, 3, 0.01)

debug.add(mesh, 'visible')
debug.add(material, 'wireframe')
debug.addColor(material, 'color')
debug.add(parameters, 'spin')


// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera resize
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
})

window.addEventListener('dblclick', () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
})



// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
// const aspectRatio = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100)
// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 3
scene.add(camera)


// Orbit
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true



// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))



// Animations
const clock = new THREE.Clock()

const tick = () => {

  const elapsedTime = clock.getElapsedTime()

  // Update object
  // mesh.rotation.y = elapsedTime
  // mesh.rotation.y -= 0.03
  // mesh.position.y = Math.sin(elapsedTime)
  // mesh.position.x = Math.cos(elapsedTime)


  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2
  // camera.position.y = cursor.y * 3
  // camera.lookAt(mesh.position)


  //Update Controls Orbit
  controls.update()

  // Render
  renderer.render(scene, camera)

  window.requestAnimationFrame(tick)
}
tick()
