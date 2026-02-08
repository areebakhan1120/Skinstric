"use client";
import Diamonds from "../Component/Diamonds";
import Image from "next/image";

interface LoadingOverlayProps {
  isLoading: boolean;
}

export default function LoadingOverlay({ isLoading }: LoadingOverlayProps) {
  if (!isLoading) return null;

  return (
    <div className="flex flex-col items-center justify-center h-[70vh] overflow-auto relative z-10">
      <div className="flex-0 flex flex-col md:flex-row items-center justify-center relative z-10">
        <div className="w-[270] h-[270] md:w-[482] md:h-[482]"></div>
        <Diamonds />
        <div className="absolute inset-0 flex flex-col items-center justify-center z-50 pointer-events-none">
          <Image
            src="/camera.svg"
            alt="Camera"
            width={136}
            height={136}
            loading="lazy"
            className="w-[100] h-[100] md:w-[136] md:h-[136] animate-pulse-grow"
          />
          <p className="mt-4 font-semibold text-sm md:text-base leading-6 tracking-tight text-[#1A1B1C] animate-pulse text-center">
            SETTING UP YOUR CAMERA ...
          </p>
        </div>
      </div>
      <div className="mt-0 text-center relative z-10">
        <p className="text-xs md:text-sm mb-4 leading-6">TO GET BETTER RESULTS MAKE SURE TO HAVE</p>
        <div className="flex justify-center space-x-8">
          <p className="text-xs md:text-sm leading-6">◇ NEUTRAL EXPRESSION</p>
          <p className="text-xs md:text-sm leading-6">◇ FRONTAL POSE</p>
          <p className="text-xs md:text-sm leading-6">◇ ADEQUATE LIGHTING</p>
        </div>
      </div>
    </div>
  );
}
