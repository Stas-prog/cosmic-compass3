"use client";

import * as THREE from "three";
import { useEffect } from "react";
import { DeviceControls } from "../core/DeviceControls";
import { getSunDirection } from "../core/useSunDirection";
import { createSunMarker } from "../render/createSunMarker";
import { createStarField } from "../render/StarField";
import NorthButton from "../ui/NorthButton";

export default function CompassMode() {
  useEffect(() => {
    // 🌌 СЦЕНА
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      5000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // 📱 КОНТРОЛЕР ПРИСТРОЮ (ФІЗИЧНИЙ БАЗИС)
    const controls = new DeviceControls();

    // 🌟 ЗОРЯНЕ НЕБО
    const stars = createStarField(4000, 3500);
    scene.add(stars);

    // ☀️ СОНЦЕ
    const { group: sunGroup, distance } = createSunMarker(1500);
    scene.add(sunGroup);

    // ⚙️ КООРДИНАТИ СПОСТЕРІГАЧА
    const LAT = 50.45; // змінюй на свої
    const LON = 34.52; // змінюй на свої

    // ☀️ НАПРЯМ СОНЦЯ У СВІТІ
    let sunDir = getSunDirection(LAT, LON, new Date());

    // 🔄 ОНОВЛЕННЯ СОНЦЯ РАЗ НА ХВИЛИНУ
    const sunTimer = setInterval(() => {
      sunDir = getSunDirection(LAT, LON, new Date());
    }, 60000);

    // 🧭 ПІВНІЧ (ЯКІР)
    let northOffset: THREE.Quaternion | null = null;

    const calibrateNorth = () => {
      northOffset = controls.getQuaternion().clone();
    };

    // 🎞 АНІМАЦІЯ
    const animate = () => {
      requestAnimationFrame(animate);

      // 📱 орієнтація пристрою
      const q = controls.getQuaternion();

      // 🧭 застосування Півночі
      if (northOffset) {
        q.premultiply(northOffset.clone().invert());
      }

      camera.quaternion.copy(q);

      // 🌌 зірки "далекі"
      stars.position.copy(camera.position);

      // ☀️ Сонце у світі
      sunGroup.position.copy(
        sunDir.clone().multiplyScalar(distance)
      );

      renderer.render(scene, camera);
    };

    animate();

    // 🧹 CLEANUP
    return () => {
      clearInterval(sunTimer);
      controls.dispose();
      renderer.dispose();
      document.body.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <>
      <NorthButton onCalibrate={() => {
        const event = new CustomEvent("calibrate-north");
        window.dispatchEvent(event);
      }} />
    </>
  );
}
