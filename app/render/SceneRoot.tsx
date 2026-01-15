"use client";

import { useEffect } from "react";
import * as THREE from "three";
import { createStarField } from "./StarField";
import { createWorldHorizon } from "../layers/HorizonLayer";
import { useLookDirection } from "../core/useLookDirection";

export function SceneRoot() {
  const lookDir = useLookDirection();

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

    // ⭐ зорі
    scene.add(createStarField());

    // 🔵 СВІТОВИЙ ГОРИЗОНТ
    const horizon = createWorldHorizon();
    scene.add(horizon);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    const animate = () => {
      requestAnimationFrame(animate);

      // 👁️ дивимось у напрямку погляду
      camera.lookAt(lookDir.current);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      document.body.removeChild(renderer.domElement);
    };
  }, [lookDir]);

  return null;
}
