
import * as THREE from "three";
import { createGreatCircle } from "../primitives/GreatCircle";

export function createEarthEquator(radius = 1000): THREE.Line {
  const earthAxis = new THREE.Vector3(0, 1, 0);
  return createGreatCircle(earthAxis, radius);
}
