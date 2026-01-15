"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function useGyroscope() {
  const quaternionRef = useRef(new THREE.Quaternion());

  useEffect(() => {
    let enabled = true;

    function onOrientation(e: DeviceOrientationEvent) {
      if (!enabled) return;

      const alpha = THREE.MathUtils.degToRad(e.alpha ?? 0); // z
      const beta  = THREE.MathUtils.degToRad(e.beta ?? 0);  // x
      const gamma = THREE.MathUtils.degToRad(e.gamma ?? 0); // y

      // порядок як у three.js device orientation
      const euler = new THREE.Euler(beta, alpha, -gamma, "YXZ");
      quaternionRef.current.setFromEuler(euler);
    }

    // iOS вимагає permission
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      // @ts-ignore
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      // чекнемо жест користувача
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
      enabled = false;
      window.removeEventListener("deviceorientation", onOrientation, true);
    };
  }, []);

  return quaternionRef;
}
