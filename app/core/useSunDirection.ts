import * as THREE from "three";

/**
 * Простий, стабільний напрям Сонця.
 * Вхід:
 *  - lat, lon: координати (градуси)
 *  - date: поточний час
 * Вихід:
 *  - нормалізований вектор напрямку в СВІТОВІЙ системі
 */
export function getSunDirection(lat: number, lon: number, date = new Date()) {
  // Дні від J2000
  const rad = Math.PI / 180;
  const dayMs = 86400000;
  const J2000 = Date.UTC(2000, 0, 1, 12);
  const d = (date.getTime() - J2000) / dayMs;

  // Сонячні параметри (спрощено, але стабільно)
  const g = rad * (357.529 + 0.98560028 * d); // середня аномалія
  const q = rad * (280.459 + 0.98564736 * d); // середня довгота
  const L = q + rad * (1.915 * Math.sin(g) + 0.020 * Math.sin(2 * g)); // екліптична довгота

  const e = rad * 23.439; // нахил екліптики
  const sinDec = Math.sin(e) * Math.sin(L);
  const dec = Math.asin(sinDec);

  // Місцевий зоряний час
  const GMST = 280.1600 + 360.9856235 * d;
  const lst = rad * (GMST + lon);
  const ha = lst - Math.atan2(Math.sin(L), Math.cos(L)); // годинний кут

  // Перехід у горизонтальні координати
  const latRad = lat * rad;
  const alt = Math.asin(
    Math.sin(latRad) * Math.sin(dec) +
    Math.cos(latRad) * Math.cos(dec) * Math.cos(ha)
  );

  const az = Math.atan2(
    -Math.sin(ha),
    Math.tan(dec) * Math.cos(latRad) - Math.sin(latRad) * Math.cos(ha)
  );

  // Вектор напряму (Y — вгору)
  const dir = new THREE.Vector3(
    Math.sin(az) * Math.cos(alt),
    Math.sin(alt),
    -Math.cos(az) * Math.cos(alt)
  );

  return dir.normalize();
}
