import { Vector3 } from "three";
import { GreatCircle } from "../primitives/GreatCircle";

const EARTH_AXIS = new Vector3(0, 1, 0);

export function createEarthEquator(): GreatCircle {
  return {
    normal: EARTH_AXIS.clone()
  };
}
