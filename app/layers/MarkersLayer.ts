import * as THREE from "three";
import { createMarker } from "../primitives/Marker";

/**
 * Напрямки умовні, але СТАБІЛЬНІ.
 * Ми їх уточнимо пізніше — архітектура готова.
 */
export function createMarkersGroup() {
  const group = new THREE.Group();

  // ▶ Напрям руху Землі по орбіті (умовно)
  const earthOrbitDir = new THREE.Vector3(1, 0, 0);
  const earthMarker = createMarker(earthOrbitDir, 1000, 0x55ff88, 6);
  group.add(earthMarker);

  // ▶ Напрям руху Сонячної системи (умовно)
  const solarSystemDir = new THREE.Vector3(0.3, 0.2, -1);
  const solarMarker = createMarker(solarSystemDir, 1000, 0xffaa55, 6);
  group.add(solarMarker);

  return group;
}
