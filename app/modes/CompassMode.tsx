"use client";

import { useEffect } from "react";
import * as THREE from "three";
import { useRealCompass } from "../core/useRealCompass";
import { createStarField } from "../render/StarField";
import { createWorldHorizon } from "../layers/HorizonLayer";
import { createEarthEquator } from "../layers/EarthEquatorLayer";
import { createMarkersGroup } from "../layers/MarkersLayer";
import { createPerceptiveHorizon } from "../render/PerceptiveHorizon";  

export function CompassMode() {
  const { yaw, pitch, roll } = useRealCompass();

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
    const horizon = createPerceptiveHorizon();

    scene.add(horizon);
    scene.add(createStarField());
    scene.add(createWorldHorizon());
    scene.add(createEarthEquator());
    scene.add(createMarkersGroup());
    // scene.add(PerceptiveHorizon(roll,pitch));

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    const animate = () => {
      requestAnimationFrame(animate);

      const y = yaw.current;
      const p = pitch.current;
const r = roll.current;

// умова видимості (тілесна!)
const mat = horizon.material as THREE.LineBasicMaterial;
const MIN_PITCH = THREE.MathUtils.degToRad(30);
const MAX_OPACITY = 0.6;

if (Math.abs(p) > MIN_PITCH) {
  horizon.material.opacity = Math.min(
    MAX_OPACITY,
    (Math.abs(p) - MIN_PITCH) / THREE.MathUtils.degToRad(20)
  );
} else {
  mat.opacity = 0;
}

// 🔑 ГОРИЗОНТ:
// не крутиться від yaw
const SMOOTH = 0.15;
horizon.rotation.z += (-r - horizon.rotation.z) * SMOOTH;


// 🔑 ЗСУВ БАЗИСУ НА 90°
// тепер "прямо" = горизонт
const py = p - Math.PI / 2;

const dir = new THREE.Vector3(
  Math.sin(y) * Math.cos(py),
  Math.sin(py),
  -Math.cos(y) * Math.cos(py)
);


      camera.lookAt(dir);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      document.body.removeChild(renderer.domElement);
    };
  }, [yaw, pitch, roll]);

  return null;
}
