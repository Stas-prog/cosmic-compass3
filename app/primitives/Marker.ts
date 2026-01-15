import * as THREE from "three";

export function createMarker(
  direction: THREE.Vector3,
  radius = 1000,
  color = 0xff5555,
  size = 6
): THREE.Points {
  const pos = direction.clone().normalize().multiplyScalar(radius);

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute([pos.x, pos.y, pos.z], 3)
  );

  const material = new THREE.PointsMaterial({
    color,
    size,
    sizeAttenuation: false,
  });

  return new THREE.Points(geometry, material);
}
