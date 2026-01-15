"use client";

import { useEffect, useState } from "react";
import * as THREE from "three";

export function HorizonOverlay({
  cameraQuaternion,
}: {
  cameraQuaternion: THREE.Quaternion;
}) {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const worldUp = new THREE.Vector3(0, 1, 0);

    // переносимо Up у простір камери
    const camUp = worldUp
      .clone()
      .applyQuaternion(cameraQuaternion.clone().invert());

    // проєкція на екран (XY)
    const a = Math.atan2(camUp.x, camUp.y);

    setAngle(a);
  }, [cameraQuaternion]);

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        width: "120vw",
        height: "2px",
        background: "rgba(80,170,255,0.9)",
        transform: `
          translate(-50%, -50%)
          rotate(${angle}rad)
        `,
        pointerEvents: "none",
      }}
    />
  );
}
