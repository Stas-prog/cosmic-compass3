import * as THREE from "three";

export default function createGreatCircle(
  normal: THREE.Vector3,
  radius: number,
  segments = 256
) {
  // знаходимо два ортонормовані вектори в площині
  const n = normal.clone().normalize();
  const ref =
    Math.abs(n.y) < 0.99
      ? new THREE.Vector3(0, 1, 0)
      : new THREE.Vector3(1, 0, 0);

  const u = new THREE.Vector3().crossVectors(n, ref).normalize();
  const v = new THREE.Vector3().crossVectors(n, u).normalize();

  const points: THREE.Vector3[] = [];

  for (let i = 0; i <= segments; i++) {
    const t = (i / segments) * Math.PI * 2;
    const p = new THREE.Vector3()
      .addScaledVector(u, Math.cos(t) * radius)
      .addScaledVector(v, Math.sin(t) * radius);
    points.push(p);
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  const material = new THREE.LineBasicMaterial({
    color: 0x44aaff,
    transparent: true,
    opacity: 0.8
  });

  return new THREE.Line(geometry, material);
}
