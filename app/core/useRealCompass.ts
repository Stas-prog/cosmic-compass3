import { useEffect, useRef } from "react";
import * as THREE from "three";

export function useRealCompass() {
  const yaw = useRef(0);
  const pitch = useRef(0);
  const roll = useRef(0);

  useEffect(() => {
    const onOrientation = (e: DeviceOrientationEvent) => {
      const a = THREE.MathUtils.degToRad(e.alpha ?? 0);
      const b = THREE.MathUtils.degToRad(e.beta ?? 0);
      const g = THREE.MathUtils.degToRad(e.gamma ?? 0);

      yaw.current = a;
      pitch.current = b;
      roll.current = g;
    };

    window.addEventListener("deviceorientation", onOrientation, true);
    return () => window.removeEventListener("deviceorientation", onOrientation);
  }, []);

  return { yaw, pitch, roll };
}
