import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import Display from "./Algorithm";
import Scene from "./Scene";

function App() {
  return (
    <>
      <Scene />
      <Display />
    </>
  );
}

export default App;
