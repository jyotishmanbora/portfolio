// import './style.css'
import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import * as dat from 'dat.gui'

//Loding

const textureLoader = new THREE.TextureLoader()
const normalTexture = textureLoader.load('./static/textures/NormalMap.png')

// Debug
// const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
let globeRadius = 0.6;
if(window.innerWidth >= 1200){
    globeRadius = 0.8;
}
if(window.innerWidth >= 1400){
    globeRadius = 0.9;
}
const geometry = new THREE.SphereBufferGeometry(globeRadius, 64, 64)
// Materials

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.6
material.roughness = 0.3
material.normalMap = normalTexture;
material.color = new THREE.Color(0x292929)

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights

//Light 1
const pointLight1 = new THREE.PointLight(0xffffff, 0.1)
pointLight1.position.x = 1.73
pointLight1.position.y = 1.39
pointLight1.position.z = -3
pointLight1.intensity = 20
scene.add(pointLight1)

// const light1 = gui.addFolder('Light 1')

// light1.add(pointLight1.position, 'x').min(-6).max(6).step(0.01)
// light1.add(pointLight1.position, 'y').min(-3).max(3).step(0.01)
// light1.add(pointLight1.position, 'z').min(-3).max(3).step(0.01)
// light1.add(pointLight1, 'intensity').min(0).max(20).step(0.01)

// const pointLightHelper1 = new THREE.PointLightHelper(pointLight1, 1)
// scene.add(pointLightHelper1)

//Light 2
const pointLight2 = new THREE.PointLight(0xffc200, 2)
pointLight2.position.set(0.61,-1,-1.2)
pointLight2.intensity = 20
scene.add(pointLight2)

// const light2 = gui.addFolder('Light 2')

// light2.add(pointLight2.position, 'x').min(-6).max(6).step(0.01)
// light2.add(pointLight2.position, 'y').min(-3).max(3).step(0.01)
// light2.add(pointLight2.position, 'z').min(-3).max(3).step(0.01)
// light2.add(pointLight2, 'intensity').min(0).max(20).step(0.01)

// const light2Color = {
//     color : 0xffc200
// }

// light2.addColor(light2Color, 'color').onChange(()=>{
//     pointLight2.color.set(light2Color.color)
// })

// const pointLightHelper2 = new THREE.PointLightHelper(pointLight2, 1)
// scene.add(pointLightHelper2)

//Light 3
const pointLight3 = new THREE.PointLight(0xfff0, 2)
pointLight3.position.set(-0.92,-0.46,-0.79)
pointLight3.intensity = 20
scene.add(pointLight3)

// const light3 = gui.addFolder('Light 3')

// light3.add(pointLight3.position, 'x').min(-6).max(6).step(0.01)
// light3.add(pointLight3.position, 'y').min(-3).max(3).step(0.01)
// light3.add(pointLight3.position, 'z').min(-3).max(3).step(0.01)
// light3.add(pointLight3, 'intensity').min(0).max(20).step(0.01)

// const light3Color = {
//     color : 0xfff0
// }

// light3.addColor(light3Color, 'color').onChange(()=>{
//     pointLight3.color.set(light3Color.color)
// })

// const pointLightHelper3 = new THREE.PointLightHelper(pointLight3, 1)
// scene.add(pointLightHelper3)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
    
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

if(window.innerWidth >= 992){
document.addEventListener('mousemove', onDocumentMouseMove);
}
let mouseX = 0 
let mouseY = 0
let targetX = 0
let targetY = 0
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function onDocumentMouseMove(event){
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
}

document.addEventListener('scroll', (event)=>{
    sphere.position.y = window.scrollY *.001
})

const clock = new THREE.Clock()

const tick = () =>
{
    targetX = mouseX*0.001;
    targetY = mouseY*0.001;

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
    sphere.rotation.x += .05 * (targetY - sphere.rotation.x)
    sphere.position.z += -.05 * (targetY - sphere.rotation.x)

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()