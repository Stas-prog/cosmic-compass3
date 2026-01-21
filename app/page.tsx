"use client";

import CompassMode  from "./modes/CompassMode";
import { Reticle } from "./ui/Reticle";

export default function Page() {
  return (
    <>
      <CompassMode />
      <Reticle />
    </>
  );
}
