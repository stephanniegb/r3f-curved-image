"use client";
import { Canvas } from "@react-three/fiber";
import Model from "./Model";

const Scene = ({ activeMenu }: { activeMenu: number | null }) => {
  return (
    <div className="fixed top-0 w-screen h-screen">
      <Canvas>
        <Model activeMenu={activeMenu} />
      </Canvas>
    </div>
  );
};

export default Scene;
