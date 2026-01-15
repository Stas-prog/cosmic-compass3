"use client";

import { useEffect } from "react";
import * as THREE from "three";
import { createStarField } from "./StarField";
import { useGyroscope } from "../core/useGyroscope";

export function SceneRoot({
  cameraQuatRef,
}: {
  cameraQuatRef: React.MutableRefObject<THREE.Quaternion>;
}) {
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

    const stars = createStarField();
    scene.add(stars);

    const animate = () => {
      requestAnimationFrame(animate);

      if (gyro.current) {
        camera.quaternion.copy(gyro.current);
        cameraQuatRef.current.copy(camera.quaternion);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      renderer.dispose();
      document.body.removeChild(renderer.domElement);
    };
  }, [gyro, cameraQuatRef]);

  return null;
}
