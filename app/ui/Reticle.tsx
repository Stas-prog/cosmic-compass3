export function Reticle() {
  return (
    <div style={{
      position: "fixed",
      top: "50%",
      left: "50%",
      width: 10,
      height: 10,
      borderRadius: "50%",
      background: "white",
      transform: "translate(-50%, -50%)"
    }} />
  );
}
