import * as THREE from "three";
import { createGreatCircle } from "../primitives/GreatCircle";

export function createWorldHorizon(radius = 1000) {
  const worldUp = new THREE.Vector3(0, 1, 0);
  return createGreatCircle(worldUp, radius);
}
