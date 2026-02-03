"use client";

import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { Suspense, useEffect } from "react";
import { useStore } from "@/hooks/useStore";
import dynamic from "next/dynamic";

const Loader = dynamic(
  () => import("@react-three/drei").then((mod) => mod.Loader),
  { ssr: false },
);

export default function ViewCanvas() {
  const ready = useStore((state) => state.ready);

  useEffect(() => {
    if (!ready) {
      document.body.style.overflowY = "hidden"; // Khóa cuộn
    } else {
      document.body.style.overflowY = "auto"; // Mở cuộn
    }
  }, [ready]);

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
        gl={{ antialias: true }}
        camera={{
          fov: 30,
        }}
      >
        <Suspense fallback={null}>
          <View.Port />
        </Suspense>
      </Canvas>
      <Loader />
    </>
  );
}
