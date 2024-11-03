"use client";

import { DotPattern } from "@/components/ui/dot-pattern";

export function Background() {
  return (
    <DotPattern
      className={
        "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)] -z-10 pointer-events-none"
      }
    />
  );
}
