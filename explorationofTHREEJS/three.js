import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
    // fov,  // Field of View (in degrees)
    // aspect,  // Aspect Ratio (width / height)
    // near,  // Near Clipping Plane (objects closer than this will be clipped)
    // far    // Far Clipping Plane (objects farther than this will be clipped)
)
const orbit = new OrbitControls(camera, renderer.domElement)
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper)
// camera.position.z = 5;
// camera.position.y = 3, or
camera.position.set(0, 2, 5);
orbit.update();
const boxGeometry = new THREE.CylinderGeometry();
const boxMaterial = new THREE.MeshStandardMaterial({ color: "green", wireframe: false, side: THREE.DoubleSide })
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

const PlaneGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshStandardMaterial({ color: "white", side: THREE.DoubleSide })
const plane = new THREE.Mesh(PlaneGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI

const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper)

const sphereGeometry = new THREE.SphereGeometry(4, 50, 50, 50)
const sphereMaterial = new THREE.MeshStandardMaterial({ color: "blue", wireframe: false })
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
scene.add(sphere);
sphere.position.set(-10, 10, 0)
const ambientLight = new THREE.AmbientLight(0x333333)
scene.add(ambientLight)
const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8)
scene.add(directionalLight)
// box.rotation.x = 5
// box.rotation.y = 5
// box.rotation.z = 5
let step = 0;
let speed = 0.01;
function animate() {
    box.rotation.x += 0.01;
    box.rotation.y += 0.01;
    step += speed;
    sphere.position.y = 10 * Math.abs(Math.sin(step))
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
