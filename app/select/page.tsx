"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

 export default function SelectPage() {
  const [hoverSmall, setHoverSmall] = useState(false);
  const [hoverMedium, setHoverMedium] = useState(false);
  const [hoverLarge, setHoverLarge] = useState(false);


  return (
    <>
      {/* Title Section */}
      <div className="absolute top-10 left-8 text-left mt-5">
        <h1 className="text-base font-semibold leading-6 tracking-tight">
          A.I. ANALYSIS
        </h1>
        <p className="text-sm mt-1 text-muted-foreground uppercase leading-6">
          A.I. HAS ESTIMATED THE FOLLOWING.
          <br />
          FIX ESTIMATED INFORMATION IF NEEDED.
        </p>
      </div>

      {/* Diamond Grid Container */}

      <div className="h-[78.3vh] flex flex-col items-center justify-center bg-white">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div   className={`absolute transition-opacity duration-500 w-[500px] h-[500px] md:w-[600px] md:h-[600px] ${
                hoverSmall ? "opacity-100" : "opacity-0"
              }`}>
              <Image
                src="/Rectangle2778.svg"
                alt="Rectangle Small"
                fill
                style={{
                  objectFit: "contain",
                  color: "transparent",
                }}
                loading="lazy"
              />
            </div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className={`absolute transition-all duration-400 w-[600px] h-[600px] md:w-[700px] md:h-[700px] ${
                hoverMedium ? "opacity-100" : "opacity-0"
              }`}>
              <Image
                src="/Rectangle2779.svg"
                alt="RectangleMedium"
                fill
                style={{
                  objectFit: "contain",
                  color: "transparent",
                }}
                loading="lazy"
              />
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className={`absolute transition-all duration-400 w-[700px] h-[700px] md:w-[800px] md:h-[800px] ${
                hoverLarge ? "opacity-100" : "opacity-0"
              }`}>
              <Image
                src="/Rectangle2780.svg"
                alt="Rectangle Large"
                fill
                style={{
                  objectFit: "contain",
                  color: "transparent",
                }}
                loading="lazy"
              />
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-3 grid-rows-3 gap-0">
            <div className="relative col-start-2 flex items-center justify-center"
                      onMouseEnter={() => setHoverSmall(true)}
                  onMouseLeave={() => setHoverSmall(false)}>
              <Link href="/summary"
               className="z-20">
                <button 
      
                className="w-[153.88] h-[153.88] bg-gray-200 hover:bg-gray-300 transform rotate-45 flex items-center justify-center -m-5 cursor-pointer font-semibold leading-6 tracking-tight uppercase hover:scale-[1.05] transition-transform duration-300">
                  <span className="transform -rotate-45">Demographics</span>
                </button>
              </Link>
            </div>
            <div className="flex items-center justify-center row-start-2 col-start-1"
                 onMouseEnter={() => setHoverMedium(true)}
                 onMouseLeave={() => setHoverMedium(false)}>
              <button className="w-[153.88px] h-[153.88px] bg-gray-100 hover:bg-gray-300 transform rotate-45 flex items-center justify-center -m-5 font-semibold leading-6 tracking-tight uppercase cursor-not-allowed">
                <span className="transform -rotate-45">Cosmetic Concerns</span>
              </button>
            </div>
            <div className="flex items-center justify-center row-start-2 col-start-3"
                 onMouseEnter={() => setHoverMedium(true)}
                 onMouseLeave={() => setHoverMedium(false)}>
              <button className="w-[153.88px] h-[153.88px] bg-gray-100 hover:bg-gray-300 transform rotate-45 flex items-center justify-center -m-5 font-semibold leading-6 tracking-tight uppercase cursor-not-allowed">
                <span className="transform -rotate-45">Skin Type Details</span>
              </button>
            </div>
            <div className="flex items-center justify-center row-start-3 col-start-2"
                 onMouseEnter={() => setHoverLarge(true)}
                 onMouseLeave={() => setHoverLarge(false)}>
              <button className="w-[153.88px] h-[153.88px] bg-gray-100 hover:bg-gray-300 transform rotate-45 flex items-center justify-center -m-5 font-semibold leading-6 tracking-tight uppercase cursor-not-allowed">
                <span className="transform -rotate-45">Weather</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="pt-4 md:pt-12 pb-8 bg-white sticky md:static bottom-40 mb-0 md:mb-0">
        {/* Back Button */}
        <div className="flex justify-between max-w-full mx-auto px-13 md:px-9">
          <Link href="/result">
            <div>
              <div className="relative w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[1] sm:hidden">
                <span className="rotate-45 text-xs font-semibold sm:hidden">
                  BACK
                </span>
              </div>
              <div className="group hidden sm:flex flex-row relative justify-center items-center">
                <div className="w-12 h-12 hidden sm:flex justify-center border border-[#1A1B1C] rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300"></div>
                <span className="absolute left-[15] bottom-[13] scale-[0.9] rotate-180 hidden sm:block group-hover:scale-[0.92] ease duration-300">
                  ▶
                </span>
                <span className="text-sm font-semibold hidden sm:block ml-6 ">
                  BACK
                </span>
              </div>
            </div>
          </Link>

          {/* Get Summary Button */}

          <Link href="/summary">
            <div>
              <div className=" w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[1] sm:hidden">
                <span className="rotate-45 text-xs font-semibold sm:hidden">
                  SUM
                </span>
              </div>
              <div className="group hidden sm:flex flex-row relative justify-center items-center">
                <span className="text-sm font-semibold hidden sm:block mr-5">
                  GET SUMMARY
                </span>
                <div className=" w-12 h-12 hidden sm:flex justify-center border border-[#1A1B1C] rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300"></div>
                <span className="absolute right-[15] bottom-[13] scale-[0.9] hidden sm:block group-hover:scale-[0.92] ease duration-300">
                  ▶
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
