"use client";
import { FiCamera } from "react-icons/fi";
import { useRouter } from "next/navigation";

interface CameraControlsProps {
  takePicture: () => void;
  hasStream: boolean;
}

export default function CameraControls({ takePicture, hasStream }: CameraControlsProps) {
  const router = useRouter();

  if (!hasStream) return null;

  return (
    <div className="absolute inset-0 z-20 pointer-events-none">
      {/* Left: Back */}
      <div className="absolute left-4 top-2/3 md:bottom-6 md:top-auto pointer-events-auto">
        <button onClick={() => router.push("/result")} className="group flex items-center">
          <div className="w-12 h-12 md:w-10 md:h-10 border border-white rotate-45 flex items-center justify-center transition-transform group-hover:scale-90 bg-black/20 backdrop-blur-sm">
            <span className="text-white -rotate-45 text-lg">◀</span>
          </div>
          <span className="text-white font-bold ml-6 text-sm md:text-base tracking-widest">BACK</span>
        </button>
      </div>

      {/* Right: Take Picture */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-auto flex items-center">
        <span className="text-white font-bold mr-4 text-sm md:text-base tracking-widest uppercase">Take Picture</span>
        <button
          onClick={takePicture}
          className="rounded-full border-2 border-white p-1 flex items-center justify-center transition-transform hover:scale-105 active:scale-95 bg-white/10 backdrop-blur-sm"
        >
          <div className="bg-white rounded-full p-3 md:p-4 flex items-center justify-center">
            <FiCamera className="w-6 h-6 md:w-8 md:h-8 invert" />
          </div>
        </button>
      </div>
    </div>
  );
}
