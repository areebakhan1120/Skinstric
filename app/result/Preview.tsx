"use client";
import Image from "next/image";

interface PreviewBoxProps {
  imageSrc?: string | null;
}

export default function PreviewBox({ imageSrc }: PreviewBoxProps) {
  return (
    <div
      className="
        absolute top-0 right-0 z-40
        md:top-[-50px] md:right-8
        transition-opacity duration-300 opacity-100
      "
    >
      <h1 className="text-xs md:text-sm font-medium mb-1 text-center md:text-left">
        Preview
      </h1>

      <div className="w-24 h-24 md:w-32 md:h-32 border border-gray-300 overflow-hidden relative bg-white">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt="Selected preview"
            fill
            unoptimized
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-[10px] tracking-widest uppercase text-gray-400">
              No Image
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
