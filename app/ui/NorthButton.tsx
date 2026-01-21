"use client";

type Props = {
  onCalibrate: () => void;
};

export default function NorthButton({ onCalibrate }: Props) {
  return (
    <button
      onClick={onCalibrate}
      style={{
        position: "fixed",
        bottom: 20,
        left: "50%",
        transform: "translateX(-50%)",
        padding: "12px 18px",
        borderRadius: "999px",
        border: "none",
        background: "#0b3d91",
        color: "white",
        fontSize: "16px",
        zIndex: 20,
      }}
    >
      🧭 Зафіксувати Північ
    </button>
  );
}
