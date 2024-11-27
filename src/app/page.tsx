import Image from "next/image";
import Link from "next/link";

import Logo from "@/assets/logo.svg";
import { TextShimmer } from "@/components/text-shimmer";
import { Button } from "@/components/ui/button";
import { ImageSpotlight } from "@/components/image-spotlight";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-12 text-center md:flex-row md:text-start lg:gap-12">
      <div className="max-w-prose space-y-3">
        <Image
          src={Logo}
          alt="hero"
          width={150}
          height={150}
          className="mx-auto md:ms-0"
        />
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
          Create a{" "}
          <TextShimmer
            duration={2}
            className="[--base-color:theme(colors.blue.600)] [--base-gradient-color:theme(colors.blue.200)] dark:[--base-color:theme(colors.blue.700)] dark:[--base-gradient-color:theme(colors.blue.400)]"
          >
            Perfect Resume in Minutes
          </TextShimmer>
        </h1>
        <p className="text-lg text-muted-foreground">
          The AI resume builder never run out of ideas, unlike you
        </p>
        <Button asChild className="" variant="gooeyLeft">
          <Link href="/resumes">Get Started</Link>
        </Button>
      </div>
      <ImageSpotlight />
    </main>
  );
}
