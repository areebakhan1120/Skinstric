"use client";

import Image from "next/image";

export default function Diamonds() {
  return (
    <>
      <Image
        src="/Rectangle2780.svg"
        alt="Diamond Large"
        width={762}
        height={762}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] md:w-[762px] animate-spin-slow rotate-[190deg]"
      />
      <Image
        src="/Rectangle2779.svg"
        alt="Diamond Medium"
        width={682}
        height={682}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[682px] animate-spin-slower rotate-[185deg]"
      />
      <Image
        src="/Rectangle2778.svg"
        alt="Diamond Small"
        width={602}
        height={602}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] md:w-[602px] animate-spin-slowest"
      />
    </>
  );
}
