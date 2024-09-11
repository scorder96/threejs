import AlgorithmDisplay from "./Algorithm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Scene2D from "./Scene2D";
import Scene3D from "./Scene3D";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="2d"
            element={
              <>
                <Scene2D /> <AlgorithmDisplay />
              </>
            }
          />
          <Route path="3d" element={<Scene3D />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
