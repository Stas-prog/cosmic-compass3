import * as THREE from "three";

export function createSunMarker(distance = 1200) {
  const group = new THREE.Group();

  const geo = new THREE.SphereGeometry(10, 16, 16);
  const mat = new THREE.MeshBasicMaterial({ color: 0xffcc33 });
  const sun = new THREE.Mesh(geo, mat);

  // легкий ореол
  const glowGeo = new THREE.SphereGeometry(16, 16, 16);
  const glowMat = new THREE.MeshBasicMaterial({
    color: 0xffdd66,
    transparent: true,
    opacity: 0.35,
  });
  const glow = new THREE.Mesh(glowGeo, glowMat);

  group.add(glow);
  group.add(sun);

  // helper: лінія напряму (опційно)
  const lineGeo = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 0, -distance),
  ]);
  const lineMat = new THREE.LineBasicMaterial({ color: 0xffcc33, opacity: 0.4, transparent: true });
  const line = new THREE.Line(lineGeo, lineMat);
  group.add(line);

  return { group, distance };
}
