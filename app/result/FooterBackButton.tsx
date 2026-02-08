// components/FooterBackButton.tsx
import Link from "next/link";

export default function FooterBackButton() {
  return (
    <div className="pt-4 md:pt-0 pb-8 bg-white sticky md:static bottom-30.5 mb-0 md:mb-0">
      <div className="absolute bottom-8 w-full flex justify-between md:px-9 px-13">
        <Link href="/testing" aria-label="Back" className="relative">
          {/* Small Screen */}
          <div className="relative w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 sm:hidden">
            <span className="rotate-[-45 text-xs font-semibold text-center">BACK</span>
          </div>

          {/* Medium+ Screen */}
          <div className="group hidden sm:flex flex-row relative justify-center items-center">
            <div className="w-12 h-12 flex justify-center border border-[#1A1B1C] rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300"></div>
            <span className="absolute left-[15] bottom-[13] scale-[0.9] rotate-180 group-hover:scale-[0.92] ease duration-300">▶</span>
            <span className="text-sm font-semibold ml-6">BACK</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
