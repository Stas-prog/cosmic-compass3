"use client";

import { useEffect } from "react";
import * as THREE from "three";
import { useRealCompass } from "../core/useRealCompass";
import { createWorldHorizon } from "../render/createWorldHorizon";

export default function CompassMode() {
  const { yaw, pitch } = useRealCompass();

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      3000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const horizon = createWorldHorizon();
    scene.add(horizon);

    const animate = () => {
      requestAnimationFrame(animate);

      const y = yaw.current;
      const p = pitch.current - Math.PI / 2; // 🔑 90° ЗСУВ БАЗИСУ

      const dir = new THREE.Vector3(
        Math.sin(y) * Math.cos(p),
        Math.sin(p),
        -Math.cos(y) * Math.cos(p)
      );

      camera.lookAt(dir);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      renderer.dispose();
      document.body.removeChild(renderer.domElement);
    };
  }, [yaw, pitch]);

  return null;
}
