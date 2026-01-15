"use client";

import * as THREE from "three";

export function CompassCalibrate({
  onCalibrate,
}: {
  onCalibrate: (alphaRad: number) => void;
}) {
  return (
    <button
      onClick={() => {
        // беремо поточний alpha напряму з DeviceOrientation
        // (користувач має дивитись на ПІВНІЧ)
        window.addEventListener(
          "deviceorientation",
          (e) => {
            const a = THREE.MathUtils.degToRad(e.alpha ?? 0);
            onCalibrate(a);
          },
          { once: true }
        );
      }}
      style={{
        position: "fixed",
        bottom: 16,
        right: 16,
        padding: "10px 14px",
        borderRadius: 10,
        background: "#1b3a1b",
        color: "#fff",
        border: "1px solid #2f6b2f",
        zIndex: 10,
      }}
    >
      Зафіксувати Північ
    </button>
  );
}
