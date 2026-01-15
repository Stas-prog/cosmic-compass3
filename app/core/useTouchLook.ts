"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function useTouchLook() {
  const yaw = useRef(0);
  const pitch = useRef(0);

  useEffect(() => {
    let active = false;
    let lastX = 0;
    let lastY = 0;

    const onDown = (x: number, y: number) => {
      active = true;
      lastX = x;
      lastY = y;
    };

    const onMove = (x: number, y: number) => {
      if (!active) return;
      const dx = x - lastX;
      const dy = y - lastY;
      lastX = x;
      lastY = y;

      const sensitivity = 0.003;
      yaw.current   -= dx * sensitivity;
      pitch.current -= dy * sensitivity;

      const maxPitch = Math.PI / 2 - 0.01;
      pitch.current = Math.max(-maxPitch, Math.min(maxPitch, pitch.current));
    };

    const onUp = () => (active = false);

    const mDown = (e: MouseEvent) => onDown(e.clientX, e.clientY);
    const mMove = (e: MouseEvent) => onMove(e.clientX, e.clientY);
    const mUp   = () => onUp();

    const tDown = (e: TouchEvent) =>
      onDown(e.touches[0].clientX, e.touches[0].clientY);
    const tMove = (e: TouchEvent) =>
      onMove(e.touches[0].clientX, e.touches[0].clientY);
    const tUp   = () => onUp();

    window.addEventListener("mousedown", mDown);
    window.addEventListener("mousemove", mMove);
    window.addEventListener("mouseup", mUp);

    window.addEventListener("touchstart", tDown, { passive: false });
    window.addEventListener("touchmove", tMove, { passive: false });
    window.addEventListener("touchend", tUp);

    return () => {
      window.removeEventListener("mousedown", mDown);
      window.removeEventListener("mousemove", mMove);
      window.removeEventListener("mouseup", mUp);

      window.removeEventListener("touchstart", tDown);
      window.removeEventListener("touchmove", tMove);
      window.removeEventListener("touchend", tUp);
    };
  }, []);

  return { yaw, pitch };
}
