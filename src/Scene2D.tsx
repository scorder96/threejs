import { Button } from "./components/ui/button";
import { Link } from "react-router-dom";

function Scene2D() {
  return (
    <>
      <Link to={"/3d"}>
        <Button className="absolute m-4">Exit Navigation</Button>
      </Link>
      <div className="flex justify-center items-center h-screen w-screen absolute">
        <img src="stationmap.png" alt="" className="h-screen" />
      </div>
    </>
  );
}

export default Scene2D;
