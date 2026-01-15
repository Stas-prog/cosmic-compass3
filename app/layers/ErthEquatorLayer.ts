import { Vector3 } from "three";

const EARTH_AXIS = new Vector3(0, 1, 0);

export function createEarthEquator() {
  return {
    normal: EARTH_AXIS.clone()
  };
}
