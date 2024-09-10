import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

function Scene() {
  const scene = new THREE.Scene();
  var light = new THREE.AmbientLight(0xffffff);
  light.intensity = 4;
  scene.add(light);
  scene.background = new THREE.Color(0x6bebc8);

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 80, 0);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer();
  renderer.setAnimationLoop(animate);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.minPolarAngle = 0;
  controls.maxPolarAngle = 0;
  controls.minDistance = 1;
  controls.maxDistance = 4;

  const loader = new GLTFLoader();
  loader.load(
    "/AB2.glb",
    function (gltf) {
      gltf.scene.scale.set(4, 4, 4);
      scene.add(gltf.scene);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );
  function animate() {
    renderer.render(scene, camera);
  }
  return <></>;
}

export default Scene;
