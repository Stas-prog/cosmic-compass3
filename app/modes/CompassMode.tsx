import * as THREE from "three";
import { useEffect } from "react";
import { useRealCompass } from "../core/useRealCompass";
import { getSunDirection } from "../core/useSunDirection";
import { createSunMarker } from "../render/createSunMarker";
import { createStarField } from "../render/StarField";
import NorthButton from "../ui/NorthButton";


export default function CompassMode() {
const { yaw, pitch, calibrateNorth, getYawFromNorth } = useRealCompass();

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
    let sunDir = getSunDirection(LAT, LON, new Date());

    // 🌌 ЗОРЯНЕ НЕБО
    const stars = createStarField();
    scene.add(stars);


    setInterval(() => {
    sunDir = getSunDirection(LAT, LON, new Date());}, 60000); // раз на хвилину


    const animate = () => {
      requestAnimationFrame(animate);

      // ставимо Сонце на сферу
    sunGroup.position.copy(sunDir.clone().multiplyScalar(distance));
    stars.position.copy(camera.position);


   
    const y = getYawFromNorth(); // 🔑 ВІД ПІВНОЧІ
    const p = pitch.current;
    const q = new THREE.Quaternion();
    q.setFromEuler(
      new THREE.Euler(
        -p,
        y,
        0,
        "YXZ"
      )
  );

    // 🔑 ЗСУВ БАЗИСУ НА 90°
    // бо камера Three.js дивиться в -Z
    const base = new THREE.Quaternion();
    base.setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2);

    q.premultiply(base);

    camera.quaternion.copy(q);


    // СОНЦЕ В КООРДИНАТАХ КАМЕРИ
    // const sunInCamera = sunDir.clone().applyQuaternion(camera.quaternion.clone().invert());

    // sunGroup.position.copy(sunInCamera.multiplyScalar(distance));



      renderer.render(scene, camera);
    };

    animate();

    return () => {
      renderer.dispose();
      document.body.removeChild(renderer.domElement);
      
    };
  }, [yaw, pitch]);

  return <>
  <NorthButton onCalibrate={calibrateNorth} />
</>
;
}
