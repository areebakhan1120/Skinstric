"use client";

interface ErrorOverlayProps {
  error: string | null;
}

export default function ErrorOverlay({ error }: ErrorOverlayProps) {
  if (!error) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white z-50 text-center p-4">
      {error}
    </div>
  );
}
