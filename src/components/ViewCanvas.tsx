import { View, Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { Perf } from "r3f-perf";
import { Suspense } from "react";

type Props = {};


export default function ViewCanvas({}: Props) {
  return (
    <>
    <Canvas
      style={{
        position: "fixed",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 30,
      }}
      shadows
      dpr={[1, 1.5]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener("webglcontextlost", (event) => {
          event.preventDefault();
        });
      }}
      camera={{
        fov: 30,
      }}
    >
      <Suspense fallback={null}>
        <View.Port />
      </Suspense>

      {/* performance metrics */}
      {/* <Perf/> */}
      <ambientLight intensity={2} />
      <spotLight intensity={3} position={[1, 1, 1]} />
    </Canvas>
    <Loader/>
    </>
  );
}
