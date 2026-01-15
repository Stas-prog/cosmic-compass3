"use client";

export function LayerToggles({
  showMarkers,
  setShowMarkers,
}: {
  showMarkers: boolean;
  setShowMarkers: (v: boolean) => void;
}) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 16,
        left: 16,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        zIndex: 10,
      }}
    >
      <button
        onClick={() => setShowMarkers(!showMarkers)}
        style={{
          padding: "8px 12px",
          borderRadius: 8,
          border: "1px solid #444",
          background: showMarkers ? "#224422" : "#111",
          color: "#fff",
        }}
      >
        Маркери
      </button>
    </div>
  );
}
