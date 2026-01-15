import * as THREE from "three";

export function createGreatCircle(
  normal: THREE.Vector3,
  radius: number,
  segments = 256
) {
  const n = normal.clone().normalize();
  const ref = Math.abs(n.y) < 0.99
    ? new THREE.Vector3(0, 1, 0)
    : new THREE.Vector3(1, 0, 0);

  const u = new THREE.Vector3().crossVectors(n, ref).normalize();
  const v = new THREE.Vector3().crossVectors(n, u).normalize();

  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const t = (i / segments) * Math.PI * 2;
    pts.push(
      new THREE.Vector3()
        .addScaledVector(u, Math.cos(t) * radius)
        .addScaledVector(v, Math.sin(t) * radius)
    );
  }

  const g = new THREE.BufferGeometry().setFromPoints(pts);
  const m = new THREE.LineBasicMaterial({
    color: 0x44aaff,
    transparent: true,
    opacity: 0.8,
  });
  return new THREE.Line(g, m);
}
