import * as THREE from "three";
import { createGreatCircle } from "../primitives/GreatCircle";

export function createHorizon(up: THREE.Vector3) {
  // Горизонт = площина ⟂ Up
  return createGreatCircle(up, 1000);
}
