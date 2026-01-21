import * as THREE from "three";
import { useEffect } from "react";
import { useRealCompass } from "../core/useRealCompass";
import { getSunDirection } from "../core/useSunDirection";
import { createSunMarker } from "../render/createSunMarker";

export default function CompassMode() {
  const { yaw, pitch } = useRealCompass();

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 4000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(innerWidth, innerHeight);
    document.body.appendChild(renderer.domElement);

    // ☀️ Сонце
    const { group: sunGroup, distance } = createSunMarker();
    scene.add(sunGroup);

    // ⚙️ координати (тимчасово задай свої)
    const LAT = 50.45; // приклад
    const LON = 30.52; // приклад

    const animate = () => {
      requestAnimationFrame(animate);

      // напрям Сонця у світі
      const sunDir = getSunDirection(LAT, LON, new Date());

      // ставимо Сонце на сферу
      sunGroup.position.copy(sunDir.clone().multiplyScalar(distance));

      // камера: людський базис (90° зсув)
      const y = yaw.current;
      const p = pitch.current - Math.PI / 2;
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
