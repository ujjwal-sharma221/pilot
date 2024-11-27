import Image from "next/image";

import HeroImage from "@/assets/hero.webp";
import { Tilt } from "./tilt";

export function ImageSpotlight() {
  return (
    <Tilt rotationFactor={8} isRevese>
      <div
        style={{
          borderRadius: "12px",
        }}
        className="flex flex-col overflow-hidden border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900"
      >
        <Image src={HeroImage} alt="hero image" width={600} className="" />
      </div>
    </Tilt>
  );
}
