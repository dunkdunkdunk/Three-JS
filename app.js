import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.117.1/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.117.1/examples/jsm/controls/OrbitControls.js'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg"),
})
renderer.setPixelRatio(Window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(100)

const geometry1 = new THREE.TorusGeometry(20, 15, 30, 100)
const material1 = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, wireframe: true })
const torus1 = new THREE.Mesh(geometry1, material1)
scene.add(torus1)

// const geometry2 = new THREE.TorusGeometry(20, 15, 30, 100)
// const material2 = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, wireframe: true })
// const torus2 = new THREE.Mesh(geometry2, material2)
// scene.add(torus2)

const spotLight1 = new THREE.SpotLight(0x0000ff)
spotLight1.position.set(40, -40, 40)

const spotLight2 = new THREE.SpotLight(0x0000ff)
spotLight2.position.set(-40, 40, -40)

const pointLight1 = new THREE.PointLight(0xff0000)
pointLight1.position.set(40, 40, 40)

const pointLight2 = new THREE.PointLight(0x00ff00)
pointLight2.position.set(-40, -40, -40)

const ambientLight = new THREE.AmbientLight(0x798541325415461)
scene.add(spotLight1, spotLight2, pointLight1, pointLight2, ambientLight)

const lightHelper1 = new THREE.PointLightHelper(pointLight1)
const lightHelper2 = new THREE.PointLightHelper(pointLight2)
const lightHelper3 = new THREE.SpotLightHelper(spotLight1)
const lightHelper4 = new THREE.SpotLightHelper(spotLight2)
const gridHelper = new THREE.GridHelper(100, 50)
// scene.add(lightHelper1, lightHelper2, lightHelper3, lightHelper4, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement)

function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24)
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
    const star = new THREE.Mesh(geometry, material)
    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))
    star.position.set(x, y, z)
    scene.add(star)
}

Array(300).fill().forEach(addStar)

function animate() {
    requestAnimationFrame(animate)

    torus1.rotation.x += 0.012;
    //torus1.rotation.y -= 0.01;
    torus1.rotation.z += 0.01;

    //torus2.rotation.x -= 0.01;
    // torus2.rotation.y += 0.021;
    // torus2.rotation.z -= 0.01;

    controls.update()

    renderer.render(scene, camera)
}

animate()