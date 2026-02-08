// components/CameraModal.tsx
"use client";

interface CameraModalProps {
  onAccept: () => void;
  onDeny: () => void;
}

export default function CameraModal({ onAccept, onDeny }: CameraModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-[352px] bg-[#1A1B1C] pt-4 pb-4 rounded-lg shadow-xl">
        <h2 className="text-[#FCFCFC] text-base font-semibold mb-12 leading-loose px-4 text-center">
          ALLOW A.I. TO ACCESS YOUR CAMERA
        </h2>

        <div className="flex justify-between px-4">
          <button
            onClick={onDeny}
            className="px-7 text-[#fcfcfca1] font-normal text-sm leading-4 tracking-tight cursor-pointer hover:text-gray-400"
          >
            DENY
          </button>

          <button
            onClick={onAccept}
            className="px-5 text-[#FCFCFC] font-semibold text-sm leading-4 tracking-tight cursor-pointer hover:text-gray-300"
          >
            ALLOW
          </button>
        </div>
      </div>
    </div>
  );
}
