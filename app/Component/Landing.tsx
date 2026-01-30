"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Landing() {
  const [hover, setHover] = useState<null | "discover" | "take">(null);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-sm:scale-[0.75] max-sm:origin-center max-sm:p-6">
      <div className="flex flex-col items-center justify-center h-[71dvh] md:fixed md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
        <div className="absolute inset-0 flex items-center justify-center lg:hidden">
          <div className="w-[350] h-[350] border border-dotted border-[#A0A4AB] rotate-45 absolute top-1/2 left-1/2 -translate-x-[52%] -translate-y-1/2"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center lg:hidden">
          <div className="w-[420] h-[420] border border-dotted border-[#A0A4AB] rotate-45 absolute top-1/2 left-1/2 -translate-x-[52%] -translate-y-1/2"></div>
        </div>
        <div id="main-heading" className="relative z-10 text-center">
          <h1
            className="text-[60px] text-[#1A1B1C] lg:text-[100px] font-inter font-normal tracking-tighter leading-none"
            style={{
              opacity: fadeIn ? 1 : 0,
              transform:
                hover === "discover"
                  ? "translateX(28rem)"
                  : hover === "take"
                    ? "translateX(-28rem)"
                    : "translateX(0)",
              transition: "opacity 7s ease-in-out, transform 2s ease-in-out",
            }}
          >
            Sophisticated
            <br />
            <span className="block text-[#1A1B1C]">skincare</span>
          </h1>
        </div>
        <p className="z-10 block lg:hidden w-[30ch] mt-4 text-[16px] font-semibold text-center text-muted-foreground text-[#1a1b1c83]">
          {" "}
          Skinstric developed an A.I. that creates a highly-personalized routine
          tailored to what your skin needs.
        </p>
        <div className="z-10 mt-4 lg:hidden">
          <Link href="/testing"></Link>
        </div>
        <div className="hidden lg:block fixed bottom-[calc(-7vh)] left-[calc(-20vw)] xl:left-[calc(-27vw)] 2xl:left-[calc(-31vw)] [@media(width>=1920px)]:left-[calc(-33vw)] font-normal text-sm text-[#1A1B1C] space-y-3 uppercase">
          <p>
            Skinstric developed an A.I. that creates a
            <br />
            highly-personalized routine tailored to
            <br />
            what your skin needs.
          </p>
        </div>
        <div
          id="left-section"
          className={`hidden lg:block fixed left-[calc(-53vw)] xl:left-[calc(-50vw)] top-1/2 -translate-y-1/2 w-[500] h-[500] transition-opacity duration-500 ${hover === "take" ? "opacity-0" : "opacity-100"}`}
        >
          <div className="relative w-full h-full">
            <div className="w-full h-full border border-dotted border-[#A0A4AB] rotate-45 fixed inset-0"></div>
            <button
              id="discover-button"
              onMouseEnter={() => setHover("discover")}
              onMouseLeave={() => setHover(null)}
              className="group inline-flex items-center justify-center gap-4 whitespace-nowrap rounded-md text-sm font-normal text-[#1A1B1C] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer disabled:opacity-50 h-9 absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/5 xl:translate-x-1/6 [@media(width>=1920px)]:translate-x-1/20 px-3 py-1"
            >
              <div
                className={`w-[30] h-[30] border border-solid border-black rotate-45 cursor-pointer group-hover:scale-110 duration-300 transition-opacity ${hover === "take" ? "opacity-0" : "opacity-100"}`}
              ></div>
              <span className="absolute left-[18] top-[8] scale-[0.9] rotate-180 group-hover:scale-105 duration-300">
                ▶
              </span>
              <span>DISCOVER A.I.</span>
            </button>
          </div>
        </div>
        <div
          id="right-section"
          className={`hidden lg:block fixed right-[calc(-53vw)] top-1/2 -translate-y-1/2 w-[500] h-[500] transition-opacity duration-500 ${hover === "discover" ? "opacity-0" : "opacity-100"}`}
        >
          <div className="relative w-full h-full">
            <div className="w-full h-full border border-dotted border-[#A0A4AB] rotate-45 absolute inset-0"></div>
            <Link href="/testing">
              <button
                id="take-test-button"
                onMouseEnter={() => setHover("take")}
                onMouseLeave={() => setHover(null)}
                className="group inline-flex items-center justify-center gap-4 whitespace-nowrap rounded-md text-sm font-normal text-[#1A1B1C] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer disabled:opacity-50 h-9 absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/5 xl:-translate-x-1/6 [@media(width>=1920px)]:-translate-x-1/20 px-3 py-1"
              >
                TAKE TEST
                <div
                  className={`w-[30] h-[30] border border-solid border-black rotate-45 group-hover:scale-110 duration-300 transition-opacity ${hover === "discover" ? "opacity-0" : "opacity-100"}`}
                ></div>
                <span className="absolute left-[113] top-[9] scale-[0.9] cursor-pointer group-hover:scale-105 duration-300">
                  ▶
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
