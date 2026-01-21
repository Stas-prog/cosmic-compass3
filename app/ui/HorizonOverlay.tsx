"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type Props = {
  pitch: React.MutableRefObject<number>;
  roll: React.MutableRefObject<number>;
  enabled?: boolean; // можна вимикати
};

export default function HorizonOverlay({
  pitch,
  roll,
  enabled = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;

    let raf = 0;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (!ref.current) return;

      // тілесна зона появи горизонту
      const MIN_PITCH = THREE.MathUtils.degToRad(30);
      const FADE_RANGE = THREE.MathUtils.degToRad(20);

      const p = Math.abs(pitch.current);
      let opacity = 0;

      if (p > MIN_PITCH) {
        opacity = Math.min(1, (p - MIN_PITCH) / FADE_RANGE);
      }

      // вертикальний зсув (менше землі, більше неба)
      const OFFSET_PX = 80; // підкручуй за смаком
      const y = Math.min(OFFSET_PX, opacity * OFFSET_PX);

      ref.current.style.opacity = String(opacity);
      ref.current.style.transform = `
        translate(-50%, ${y}px)
        rotate(${-roll.current}rad)
      `;
    };

    animate();
    return () => cancelAnimationFrame(raf);
  }, [pitch, roll, enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        left: "50%",
        top: "50%",
        width: "140%",
        height: "2px",
        background: "rgba(80,160,255,0.7)",
        transformOrigin: "center center",
        pointerEvents: "none",
        opacity: 0,
        zIndex: 10,
      }}
    />
  );
}
