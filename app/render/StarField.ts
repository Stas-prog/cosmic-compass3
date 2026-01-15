import * as THREE from "three";

export function createStarField(radius = 4000, count = 4000) {
  const g = new THREE.BufferGeometry();
  const p = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    p[i * 3 + 0] = radius * Math.sin(phi) * Math.cos(theta);
    p[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    p[i * 3 + 2] = radius * Math.cos(phi);
  }

  g.setAttribute("position", new THREE.BufferAttribute(p, 3));
  const m = new THREE.PointsMaterial({ color: 0xffffff, size: 1.2, sizeAttenuation: false });
  return new THREE.Points(g, m);
}
