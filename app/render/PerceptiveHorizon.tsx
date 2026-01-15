import * as THREE from "three";

export function createPerceptiveHorizon(radius = 1000) {
  const segments = 128;
  const pts: THREE.Vector3[] = [];

  for (let i = 0; i <= segments; i++) {
    const t = (i / segments) * Math.PI * 2;
    pts.push(new THREE.Vector3(
      Math.cos(t) * radius,
      0,
      Math.sin(t) * radius
    ));
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(pts);
  const material = new THREE.LineBasicMaterial({
    color: 0x4aa3ff,
    transparent: true,
    opacity: 0, // спочатку невидимий
  });

  const line = new THREE.Line(geometry, material);
  return line;
}
