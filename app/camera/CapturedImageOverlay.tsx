"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CapturedImageOverlayProps {
  capturedImage: string;
  handleRetake: () => void;
  setError: (err: string) => void;
  stopCamera: () => void; // new
}


export default function CapturedImageOverlay({
  capturedImage,
  handleRetake,
  setError,
  stopCamera,
}: CapturedImageOverlayProps) {
  const router = useRouter();
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleUsePhoto = async () => {
    stopCamera();
    setIsAnalyzing(true);

    // Wait 5 seconds
    await new Promise((resolve) => setTimeout(resolve, 5000));

    try {
      localStorage.setItem("capturedImage", capturedImage);
      router.push("/select");
    } catch (e) {
      console.error("Failed to save image", e);
      setError("Failed to save image.");
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="md:h-[85vh] h-[65vh] w-full bg-transparent relative overflow-hidden flex items-center justify-center">
      <Image
        src={capturedImage}
        alt="Captured"
        fill
        className="fixed top-0 left-0 w-screen h-screen object-cover z-0"
      />

      {/* Analyzing Overlay */}
      {isAnalyzing && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-[#FCFCFC]  opacity-50 p-6 rounded-lg shadow-lg text-center">
            <p className="text-xl animate-pulse">
              ANALYZING IMAGE...
            </p>
            {/* Loading Dots */}
            <div className="flex items-center justify-center space-x-4 py-8">
              <div className="w-2 h-2 rounded-full bg-[#1A1B1C] animate-[bounce_1s_infinite_0ms] opacity-30"></div>
              <div className="w-2 h-2 rounded-full bg-[#1A1B1C] animate-[bounce_1s_infinite_250ms] opacity-30"></div>
              <div className="w-2 h-2 rounded-full bg-[#1A1B1C] animate-[bounce_1s_infinite_500ms] opacity-30"></div>
            </div>
          </div>
        </div>
      )}

      <div
        className={`absolute inset-0 z-20 flex flex-col justify-between py-10 transition-opacity duration-300 ${isAnalyzing ? "opacity-0" : "opacity-100"}`}
      >
        <div className="w-full text-center mt-10 md:mt-0">
          <h2 className="text-white font-bold text-lg md:text-xl tracking-widest uppercase drop-shadow-md">
            GREAT SHOT!
          </h2>
        </div>

        {/* Back Button */}
        <div className="absolute bottom-40 sm:bottom-16 left-0 right-0 flex flex-col items-center z-20">
          <h2 className="text-lg font-semibold mb-5 md:mb-7 text-[#FCFCFC] drop-shadow-md">
            Preview
          </h2>
          <div className="flex justify-center space-x-6">
            <button
              onClick={handleRetake}
              className="px-4 py-1 bg-gray-200 text-gray-800 cursor-pointer hover:bg-gray-300 shadow-md text-sm"
            >
              Retake
            </button>
            <button
              onClick={handleUsePhoto}
              className="px-6 py-2 bg-[#1A1B1C] text-[#FCFCFC] cursor-pointer hover:bg-gray-800 shadow-md text-sm"
            >
              Use This Photo
            </button>
          </div>

          <div className="absolute md:bottom-8 bottom-60 left-8 z-20">
            <Link href="/result">
              <div>
                <div className="relative w-12 h-12 flex items-center justify-center border border-[#FCFCFC] rotate-45 scale-[1] sm:hidden">
                  <button
                    onClick={handleRetake}
                    className="rotate-[-45] text-xs font-semibold sm:hidden text-[#FCFCFC]"
                  >
                    BACK
                  </button>
                </div>
                <div className="group hidden sm:flex flex-row relative justify-center items-center">
                  <div className=" w-12 h-12 hidden sm:flex justify-center border border-[#FCFCFC] rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300"></div>
                  <span className="absolute left-[15] bottom-[13] scale-[0.9] rotate-180 hidden sm:block text-[#FCFCFC] group-hover:scale-[0.92] ease duration-300">
                    ◀
                  </span>
                  <span className="text-sm font-semibold hidden sm:block ml-6 text-[#FCFCFC]">
                    BACK
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
