import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { Button } from "./components/ui/button";
import { Link } from "react-router-dom";
import local_taxi from "/src/assets/local_taxi.svg";
import currency_rupee from "/src/assets/currency_rupee.svg";
import local_parking from "/src/assets/local_parking.svg";
import restaurant from "/src/assets/restaurant.svg";
import washroom from "/src/assets/washroom.svg";

function Scene3D() {
  const scene = new THREE.Scene();
  var light = new THREE.DirectionalLight(0xfdfbd3);
  light.intensity = 2;
  scene.add(light);
  scene.background = new THREE.Color(0xffffff);

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(5, 2, 5);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer();
  renderer.setAnimationLoop(animate);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  light.shadow.bias = 0.0001;

  new OrbitControls(camera, renderer.domElement);
  //   controls.minPolarAngle = 0;
  //   controls.maxPolarAngle = 0;
  //   controls.minDistance = 1;
  //   controls.maxDistance = 4;
  const loader = new GLTFLoader();
  loader.load(
    "/station.glb",
    function (gltf) {
      // gltf.scene.scale.set(4, 4, 4);
      scene.add(gltf.scene);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );
  function createTextPlane(text: string, size = 200) {
    // Create the square canvas
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = size;
    canvas.height = size;

    // Set text properties
    context!.font = "bold 180px Arial";
    context!.fillStyle = "white";
    context!.textAlign = "center";
    context!.textBaseline = "middle";

    // Draw the centered text
    context!.fillText(text, canvas.width / 2, canvas.height / 2);

    // Use the canvas as a texture
    const texture = new THREE.CanvasTexture(canvas);

    // Create a plane geometry and apply the canvas texture with transparency
    const geometry = new THREE.PlaneGeometry(0.5, 0.5); // Adjust the plane size
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      //   transparent: true, // Enable transparency
      side: THREE.DoubleSide, // Render both sides of the plane
    });

    // Return the created mesh
    return new THREE.Mesh(geometry, material);
  }

  // Create multiple text planes dynamically
  const numPlanes = 16; // Number of planes to create
  const positions = [
    [-4, -5],
    [-3, -6],
    [-3, -4],
    [-2, -6],
    [-2, -4],
    [-1, -6],
    [-1, -4],
    [0, -6],
    [0, -4],
    [1, -6],
    [1, -4],
    [2, -6],
    [2, -4],
    [3, -6],
    [3, -4],
    [4, -5],
  ];
  for (let i = 1; i <= numPlanes; i++) {
    const plane = createTextPlane(i.toString()); // Create plane with text as the number
    plane.position.set(positions[i - 1][0], 1, positions[i - 1][1]); // Adjust the position
    scene.add(plane); // Add the plane to the scene
  }

  function createImagePlane(imageSrc: string, size = 200): Promise<THREE.Mesh> {
    // Create the square canvas
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext("2d");

    // Load the image
    const image = new Image();
    image.src = imageSrc;

    // Return a promise to ensure the image is loaded before creating the plane
    return new Promise((resolve) => {
      image.onload = () => {
        // Draw the image on the canvas, centered
        // context!.clearRect(0, 0, canvas.width, canvas.height);
        context!.drawImage(image, 0, 0, canvas.width, canvas.height);

        // Use the canvas as a texture
        const texture = new THREE.CanvasTexture(canvas);

        // Create a plane geometry and apply the canvas texture
        const geometry = new THREE.PlaneGeometry(0.5, 0.5); // Adjust the plane size
        const material = new THREE.MeshBasicMaterial({
          map: texture,
          //   transparent: true, // Enable transparency if the image has transparency
          side: THREE.DoubleSide, // Render both sides of the plane
        });

        // Create and resolve the mesh
        const plane = new THREE.Mesh(geometry, material);
        resolve(plane);
      };
    });
  }

  // Create multiple image planes dynamically
  const numImgPlanes = 11; // Number of planes to create
  const imgpositions = [
    [-6, -8],
    [5, -5],
    [-6, -7],
    [5, -7],
    [6, -5],
    [-6, -4],
    [6, -2],
    [5, -3],
    [-5, -5],
    [-4, -6],
    [5, -5],
  ];
  const imageSrcArray = [
    local_taxi,
    local_taxi,
    washroom,
    washroom,
    washroom,
    local_parking,
    local_parking,
    currency_rupee,
    currency_rupee,
    restaurant,
    restaurant,
  ];
  addImagePlanes();
  async function addImagePlanes() {
    for (let i = 0; i < numImgPlanes; i++) {
      const plane = await createImagePlane(imageSrcArray[i]); // Create plane with image
      plane.position.set(imgpositions[i][0], 1, imgpositions[i][1]); // Adjust the position
      scene.add(plane); // Add the plane to the scene
    }
  }

  function animate() {
    renderer.render(scene, camera);
  }
  return (
    <>
      <Link to={"/2d"}>
        <Button className="absolute m-4">Navigate</Button>
      </Link>
    </>
  );
}

export default Scene3D;
