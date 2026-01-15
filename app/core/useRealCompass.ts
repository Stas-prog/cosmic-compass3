"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function useRealCompass() {
  const yaw = useRef(0);    // відносний поворот
  const pitch = useRef(0);  // нахил (гравітація)
  const roll = useRef(0);  // нахил вліво/вправо (гравітація) - поки не використовується
  const northOffset = useRef(0); // калібровка півночі (радіани)

  useEffect(() => {
    function onOrientation(e: DeviceOrientationEvent) {
      // beta: вперед/назад (гравітація)
      // gamma: ліво/право (гравітація)
      // alpha: оберт навколо вертикалі (відносний)
      const a = THREE.MathUtils.degToRad(e.alpha ?? 0);
      const b = THREE.MathUtils.degToRad(e.beta ?? 0);
      const g = THREE.MathUtils.degToRad(e.gamma ?? 0);

      // pitch з гравітації
      pitch.current = THREE.MathUtils.clamp(b, -Math.PI / 2 + 0.01, Math.PI / 2 - 0.01);

      // yaw — ВІДНОСНИЙ, з урахуванням калібровки
      yaw.current = a - northOffset.current;

        // roll з гравітації (поки не використовується)
      roll.current = g;

    }

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

  // Кнопка калібровки: дивимось на РЕАЛЬНУ північ і фіксуємо
  function calibrateNorth(currentAlphaRad: number) {
    northOffset.current = currentAlphaRad;
  }

  return { yaw, pitch, roll, calibrateNorth };

}
