"use client";

import { useEffect } from "react";
import * as THREE from "three";
import { useRealCompass } from "../core/useRealCompass";
import { createStarField } from "../render/StarField";
import { createWorldHorizon } from "../layers/HorizonLayer";
import { createEarthEquator } from "../layers/EarthEquatorLayer";
import { createMarkersGroup } from "../layers/MarkersLayer";

export function CompassMode() {
  const { yaw, pitch } = useRealCompass();

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

    scene.add(createStarField());
    scene.add(createWorldHorizon());
    scene.add(createEarthEquator());
    scene.add(createMarkersGroup());

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

      // напрям погляду у світі
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
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      document.body.removeChild(renderer.domElement);
    };
  }, [yaw, pitch]);

  return null;
}
