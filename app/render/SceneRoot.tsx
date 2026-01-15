"use client";

import { useEffect } from "react";
import * as THREE from "three";
import { createStarField } from "./StarField";
import { createDefaultObserver } from "../core/Observer";
import { createHorizon } from "../layers/HorizonLayer";
import { useGyroscope } from "../core/useGyroscope";

export function SceneRoot() {
  const gyro = useGyroscope();

  useEffect(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
    );
    camera.position.set(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // ⭐ зоряне небо
    const stars = createStarField();
    scene.add(stars);

    // 👁️ спостерігач
    const observer = createDefaultObserver();

    // 🔵 горизонт (об’єктивний)
    const horizon = createHorizon(observer.up);
    scene.add(horizon);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    const animate = () => {
      requestAnimationFrame(animate);

      // 🔄 застосовуємо гіроскоп до КАМЕРИ
     if (gyro.current) {
  // 1. беремо орієнтацію з гіроскопа
const q = gyro.current.clone();

// 2. переводимо в Euler
const e = new THREE.Euler().setFromQuaternion(q, "YXZ");

// 3. ОБНУЛЯЄМО roll (Z)
e.z = 0;

// 4. назад у quaternion
camera.quaternion.setFromEuler(e);

// 5. горизонт компенсуємо
horizon.quaternion.copy(camera.quaternion).invert();

}


      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      document.body.removeChild(renderer.domElement);
    };
  }, [gyro]);

  return null;
}
