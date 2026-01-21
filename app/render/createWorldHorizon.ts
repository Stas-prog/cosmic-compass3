import * as THREE from "three";

export function createWorldHorizon(radius = 1000) {
  const segments = 256;
  const points: THREE.Vector3[] = [];

  for (let i = 0; i <= segments; i++) {
    const t = (i / segments) * Math.PI * 2;
    points.push(
      new THREE.Vector3(
        Math.cos(t) * radius,
        0,
        Math.sin(t) * radius
      )
    );
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color: 0x4aa3ff,
    transparent: true,
    opacity: 0.6,
  });

  const line = new THREE.Line(geometry, material);

  // 🔑 ОПУСКАЄМО ГОРИЗОНТ (менше землі, більше неба)
  line.rotation.x = THREE.MathUtils.degToRad(12);

  return line;
}
