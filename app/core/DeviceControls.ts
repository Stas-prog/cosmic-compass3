import * as THREE from "three";

export class DeviceControls {
  private deviceQuat = new THREE.Quaternion();
  private screenQuat = new THREE.Quaternion();
  private worldQuat = new THREE.Quaternion();
  private northQuat = new THREE.Quaternion(); // 🧭 якір Півночі

  private zee = new THREE.Vector3(0, 0, 1);

  private alpha = 0; // yaw
  private beta = 0;  // pitch
  private gamma = 0; // roll
  private orient = 0;

  constructor() {
    window.addEventListener("deviceorientation", this.onOrientation, true);
    window.addEventListener("orientationchange", this.onScreenOrientation, true);
    window.addEventListener("calibrate-north", this.onCalibrateNorth, true);
    this.onScreenOrientation();
  }

  // 📱 Дані з сенсорів
  onOrientation = (e: DeviceOrientationEvent) => {
    this.alpha = THREE.MathUtils.degToRad(e.alpha || 0);
    this.beta = THREE.MathUtils.degToRad(e.beta || 0);
    this.gamma = THREE.MathUtils.degToRad(e.gamma || 0);
  };

  // 📱 Орієнтація екрана
  onScreenOrientation = () => {
    const o = (window.orientation as number) || 0;
    this.orient = THREE.MathUtils.degToRad(o);
  };

  // 🧭 Калібрування Півночі
  onCalibrateNorth = () => {
    this.northQuat.copy(this.worldQuat);
  };

  // 🌍 Отримати фізично коректний кватерніон
  getQuaternion() {
    // базовий euler з телефону
    const euler = new THREE.Euler(
      this.beta,   // нахил
      this.alpha,  // обертання
      -this.gamma, // компенс. рол
      "YXZ"
    );

    // орієнтація пристрою
    this.deviceQuat.setFromEuler(euler);

    // орієнтація екрана
    this.screenQuat.setFromAxisAngle(this.zee, -this.orient);

    // світовий кватерніон
    this.worldQuat.multiplyQuaternions(this.deviceQuat, this.screenQuat);

    // 🧭 застосування Півночі
    const finalQuat = this.worldQuat.clone().premultiply(
      this.northQuat.clone().invert()
    );

    return finalQuat;
  }

  // 🧹 очистка
  dispose() {
    window.removeEventListener("deviceorientation", this.onOrientation);
    window.removeEventListener("orientationchange", this.onScreenOrientation);
    window.removeEventListener("calibrate-north", this.onCalibrateNorth);
  }
}
