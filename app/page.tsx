"use client";

import { useRef } from "react";
import * as THREE from "three";
import { SceneRoot } from "./render/SceneRoot";
import { Reticle } from "./ui/Reticle";
import { HorizonOverlay } from "./ui/HorizonOverlay";

export default function Page() {
  const cameraQuatRef = useRef(new THREE.Quaternion());

  return (
    <>
      <SceneRoot cameraQuatRef={cameraQuatRef} />
      <HorizonOverlay cameraQuaternion={cameraQuatRef.current} />
      <Reticle />
    </>
  );
}
