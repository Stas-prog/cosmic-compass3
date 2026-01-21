import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export function useRealCompass() {
  const yaw = useRef(0);
  const pitch = useRef(0);
  const roll = useRef(0);

  // 🔑 ЯКІР ПІВНОЧІ
  const northOffset = useRef<number | null>(null);

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

  // 🧭 ФУНКЦІЯ ФІКСАЦІЇ ПІВНОЧІ
  const calibrateNorth = () => {
    northOffset.current = yaw.current;
  };

  // 🧭 ВИРІВНЯНИЙ YAW (ВІД ПІВНОЧІ)
  const getYawFromNorth = () => {
    if (northOffset.current === null) return yaw.current;
    return yaw.current - northOffset.current;
  };

  return {
    yaw,
    pitch,
    roll,
    calibrateNorth,
    getYawFromNorth,
  };
}
