"use client";
import { RefObject } from "react";

interface CameraVideoProps {
  videoRef: RefObject<HTMLVideoElement>;
  hasStream: boolean;
  capturedImage: string | null;
  isLoading: boolean;
}

export default function CameraVideo({ videoRef, hasStream, capturedImage, isLoading }: CameraVideoProps) {
  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      muted
      className={`fixed top-0 left-0 w-screen h-screen object-cover z-1 ${
        hasStream && !capturedImage && !isLoading ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
