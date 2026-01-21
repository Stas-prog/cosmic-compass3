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

    // ⚙️ координати 
    const LAT = 50.45; // приклад
    const LON = 34.52; // приклад

    // 🍀 напрям Сонця у світі
    const sunDir = getSunDirection(LAT, LON, new Date());

    const animate = () => {
      requestAnimationFrame(animate);

      // ставимо Сонце на сферу
    //   sunGroup.position.copy(sunDir.clone().multiplyScalar(distance));

   
    const q = new THREE.Quaternion();

    // yaw (навколо Y), pitch (навколо X), roll = 0
        q.setFromEuler(
          new THREE.Euler(
           pitch.current,
           yaw.current,
           0,
            "YXZ"
  )
);

    camera.quaternion.copy(q);

    // СОНЦЕ В КООРДИНАТАХ КАМЕРИ
    const sunInCamera = sunDir.clone().applyQuaternion(camera.quaternion.clone().invert());

    sunGroup.position.copy(sunInCamera.multiplyScalar(distance));



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
