"use client";

import { useEffect } from "react";
import * as THREE from "three";
import { createStarField } from "./StarField";
import { createDefaultObserver } from "../core/Observer";
import { createHorizon } from "../layers/HorizonLayer";

export function SceneRoot() {
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

    // 🔵 горизонт
    const horizon = createHorizon(observer.up);
    scene.add(horizon);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      renderer.dispose();
      document.body.removeChild(renderer.domElement);
    };
  }, []);

  return null;
}
