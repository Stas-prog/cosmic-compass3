import { Vector3 } from "three";
import { GreatCircle } from "../primitives/GreatCircle";
import { Observer } from "../core/Observer";

export function createHorizon(observer: Observer): GreatCircle {
  return {
    normal: observer.up.clone().normalize()
  };
}
