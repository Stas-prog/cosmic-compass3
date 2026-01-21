"use client";

import CompassMode  from "./modes/CompassMode";
import { useRealCompass } from "./core/useRealCompass";
import { Reticle } from "./ui/Reticle";
import HorizonOverlay from "./ui/HorizonOverlay";

// ...



export default function Page() {
  const { pitch, roll } = useRealCompass();


  return (
    <>
      <CompassMode />
      <Reticle />
      <HorizonOverlay pitch={pitch} roll={roll} enabled={false} />
    </>
  );
}
