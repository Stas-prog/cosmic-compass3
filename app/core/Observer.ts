import { Vector3 } from "three";

export interface Observer {
  position: Vector3; // від центру Землі
  up: Vector3;       // локальний зеніт
}
