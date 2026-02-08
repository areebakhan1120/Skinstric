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
    <div className="relative max-sm:scale-[0.75] max-sm:origin-center max-sm:p-6">
      <div className="flex flex-col items-center justify-center h-[71dvh] md:fixed md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2">

        {/* ================= MOBILE BACKGROUND DIAMONDS (<1020px) ================= */}
        <div className="absolute inset-0 flex items-center justify-center min-[1020px]:hidden pointer-events-none">
          <div className="w-[350] h-[350] border border-dotted border-[#A0A4AB] rotate-45 absolute" />
          <div className="w-[420] h-[420] border border-dotted border-[#A0A4AB] rotate-45 absolute" />
          
        </div>

        {/* ================= MAIN HEADING ================= */}
        <div id="main-heading" className="relative z-10 text-center">
          <h1
            className="text-[60px] min-[1020px]:text-[100px] text-[#1A1B1C] font-inter font-normal tracking-tighter leading-none"
            style={{
              opacity: fadeIn ? 1 : 0,
              transform:
                hover === "discover"
                  ? "translateX(28rem)"
                  : hover === "take"
                  ? "translateX(-28rem)"
                  : "translateX(0)",
              transition: "opacity 7s ease-in-out, transform 2.5s ease-in-out",
            }}
          >
            Sophisticated
            <br />
            <span className="block">skincare</span>
          </h1>
        </div>

        {/* ================= MOBILE DESCRIPTION ================= */}
        <p className="z-10 block min-[1020px]:hidden w-[30ch] mt-4 text-[16px] font-semibold text-center text-[#1a1b1c83]">
          Skinstric developed an A.I. that creates a highly-personalized routine
          tailored to what your skin needs.
        </p>

        {/* ================= MOBILE CTA ================= */}
        <div className="z-10 mt-6 min-[1020px]:hidden">
          <Link href="/testing">
            <button className="group flex items-center justify-center gap-4">
              <span className="font-extrabold text-[12px] text-[#1A1B1C] uppercase tracking-wide">
                Enter Experience
              </span>
              <div className="relative flex items-center justify-center w-[30] h-[30]">
                <div className="absolute inset-0 border border-solid border-[#1A1B1C] rotate-45 transition-transform duration-300 group-hover:scale-110" />
                <span className="relative text-[10px]">▶</span>
              </div>
            </button>
          </Link>
        </div>

        {/* ================= DESKTOP DESCRIPTION ================= */}
        <div className="hidden min-[1020px]:block fixed bottom-[calc(-7vh)] left-[calc(-20vw)] xl:left-[calc(-27vw)] 2xl:left-[calc(-31vw)] [@media(width>=1920px)]:left-[calc(-33vw)] font-normal text-sm text-[#1A1B1C] space-y-3 uppercase">
          <p>
            Skinstric developed an A.I. that creates a
            <br />
            highly-personalized routine tailored to
            <br />
            what your skin needs.
          </p>
        </div>

        {/* ================= LEFT DESKTOP SECTION ================= */}
        <div
          className={`hidden min-[1020]:block fixed left-[calc(-53vw)] xl:left-[calc(-50vw)] top-1/2 -translate-y-1/2 w-[500] h-[500] transition-opacity duration-500 ${
            hover === "take" ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="relative w-full h-full">
            <div className="w-full h-full border border-dotted border-[#A0A4AB] rotate-45 fixed inset-0" />
            <button
              onMouseEnter={() => setHover("discover")}
              onMouseLeave={() => setHover(null)}
              className="group inline-flex items-center gap-4 text-sm font-normal text-[#1A1B1C] absolute top-1/2 right-0 -translate-y-1/2 px-3 py-1"
            >
              <div
                className={`w-[30] h-[30] border border-black rotate-45 transition-opacity ${
                  hover === "take" ? "opacity-0" : "opacity-100"
                }`}
              />
              <span className="absolute left-[18] top-[8] rotate-180">▶</span>
              <span>DISCOVER A.I.</span>
            </button>
          </div>
        </div>

        {/* ================= RIGHT DESKTOP SECTION ================= */}
        <div
          className={`hidden min-[1020]:block fixed right-[calc(-53vw)] top-1/2 -translate-y-1/2 w-[500] h-[500] transition-opacity duration-500 ${
            hover === "discover" ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="relative w-full h-full">
            <div className="w-full h-full border border-dotted border-[#A0A4AB] rotate-45 absolute inset-0" />

            <Link href="/testing">
              <button
                onMouseEnter={() => setHover("take")}
                onMouseLeave={() => setHover(null)}
                className="group inline-flex items-center gap-4 text-sm font-normal text-[#1A1B1C] absolute top-1/2 left-0 -translate-y-1/2 px-3 py-1"
              >
                TAKE TEST
                <div
                  className={`w-[30] h-[30] border border-black rotate-45 transition-opacity ${
                    hover === "discover" ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span className="absolute left-[113] top-[9]">▶</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
