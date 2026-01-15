"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function useLookDirection() {
  const dirRef = useRef(new THREE.Vector3(0, 0, -1));

  useEffect(() => {
    function onOrientation(e: DeviceOrientationEvent) {
      const alpha = THREE.MathUtils.degToRad(e.alpha ?? 0); // yaw
      const beta  = THREE.MathUtils.degToRad(e.beta ?? 0);  // pitch

      const maxPitch = Math.PI / 2 - 0.01;
      const pitch = Math.max(-maxPitch, Math.min(maxPitch, beta));
      const yaw = alpha;

      // сферичний напрям погляду
      dirRef.current.set(
        Math.sin(yaw) * Math.cos(pitch),
        Math.sin(pitch),
        -Math.cos(yaw) * Math.cos(pitch)
      ).normalize();
    }

    // iOS permission
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      // @ts-ignore
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      const handler = async () => {
        // @ts-ignore
        const p = await DeviceOrientationEvent.requestPermission();
        if (p === "granted") {
          window.addEventListener("deviceorientation", onOrientation, true);
        }
        window.removeEventListener("click", handler);
      };
      window.addEventListener("click", handler);
    } else {
      window.addEventListener("deviceorientation", onOrientation, true);
    }

    return () => {
      window.removeEventListener("deviceorientation", onOrientation, true);
    };
  }, []);

  return dirRef;
}
