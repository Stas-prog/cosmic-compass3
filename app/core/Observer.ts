import { Vector3 } from "three";

export function createDefaultObserver() {
  // Спостерігач на поверхні Землі (умовно)
  const up = new Vector3(0, 1, 0);

  return {
    up
  };
}
