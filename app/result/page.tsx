"use client";
import Image from "next/image"; // Add Image import
import { useState } from "react";
import { useRouter as useAppRouter } from "next/navigation";
import PreviewBox from "./Preview";
import FooterBackButton from "./FooterBackButton";
import CameraModal from "./CameraModal";
import Diamonds from "../Component/Diamonds";

// ... existing imports

export default function ResultPage() {
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  const router = useAppRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleOpenCameraModal = () => setIsCameraModalOpen(true);

  const handleAcceptCamera = () => {
    try {
      router.push("/camera");
    } catch (err) {
      console.error("Navigation error:", err);
      alert("Navigation failed. Please try again.");
    }
    setIsCameraModalOpen(false);
  };

  const handleDenyCamera = () => {
    alert("Camera access denied!");
    setIsCameraModalOpen(false);
  };

 const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const imageURL = URL.createObjectURL(file);

  // 1. Show image in preview
  setSelectedImage(imageURL);

  // Optional: store immediately so next page has it
  localStorage.setItem("capturedImage", imageURL);

  // 2. Give React time to render the preview
  setTimeout(() => {
    setIsLoading(true);

    // 3. Simulate analysis, then redirect
    setTimeout(() => {
      router.push("/select");
    }, 5000);
  }, 2000); // 👈 enough for the preview to visibly update
};



  

  return (
    <div className="min-h-[92vh] flex flex-col bg-white relative md:pt-[64] justify-center">
        {isLoading && (
      <div className="min-h-[92vh] flex flex-col bg-white relative justify-center items-center overflow-hidden">
      
         <div className="relative w-[300] h-[300] md:w-[600] md:h-[600] flex items-center justify-center">
            <Diamonds />
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
               <p className="font-bold text-sm md:text-lg tracking-widest uppercase text-black mb-4">
                  PREPARING YOUR ANALYSIS...
               </p>
          
               <div className="flex gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
               </div>
            </div>
         </div>
      </div>
  )}
      <div className="absolute top-2 left-9 md:left-8 text-left">
        <p className="font-semibold text-xs md:text-sm">TO START ANALYSIS</p>
      </div>

      {/* Main Content - Options */}
      {!isLoading && !selectedImage && (
      <div className="flex-[0.4] md:flex-1 flex flex-col md:flex-row items-center xl:justify-center relative mb-0 md:mb-30 space-y-[-20] md:space-y-0">
        {/* Option 1: Camera */}
        <div
          className="relative md:absolute md:left-[55%] lg:left-[50%] xl:left-[40%] md:translate-y-[0%] -translate-y-[1%] md:-translate-x-full flex flex-col items-center justify-center"
          onClick={handleOpenCameraModal}
        >
          <div className="w-[270] h-[270] md:w-[482] md:h-[482]"></div>
          <Diamonds />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Image
              src="/camera.svg"
              alt="Line"
              width={136}
              height={136}
              className="absolute w-[100] h-[100] md:w-[136] md:h-[136] hover:scale-108 duration-700 ease-in-out cursor-pointer"
            />
            <div className="absolute bottom-[1%] right-[90] md:top-[30.9%] md:right-[-12] translate-y-[-10%]">
              <p className="text-xs md:text-sm font-normal mt-[-10] mx-[-10] leading-loose">
                ALLOW A.I.
                <br />
                TO SCAN YOUR FACE
              </p>
              <Image
                src="/Group 39690.svg"
                alt="Line"
                width={66}
                height={66}
                className="absolute hidden md:block md:right-[143] md:top-[20]"
              />
            </div>
          </div>
        </div>

        {/* Option 2: Gallery */}
        <div
          className="relative md:absolute md:left-[45%] lg:left-[50%] xl:left-[55%] flex flex-col items-center mt-12 md:mt-0 justify-center md:translate-y-[0%] -translate-y-[10%] transition-opacity duration-300 opacity-100"
          onClick={() =>
            (
              document.querySelector(
                'input[type="file"]',
              ) as HTMLInputElement | null
            )?.click()
          }
        >
          <div className="w-[270] h-[270] md:w-[482] md:h-[482]"> </div>
          <Diamonds />

          {/* Icon */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Image
              src="/gallery.svg"
              alt="Gallery"
              width={136}
              height={136}
              className="absolute w-[100] h-[100] md:w-[136] md:h-[136] hover:scale-108 duration-700 ease-in-out cursor-pointer "
            />
          </div>

          {/* Text & Line Container - Positioned Bottom-Left */}
          <div className="absolute top-[75%] right-[90] md:right-auto md:top-[70%] md:left-[17]">
            {/* Text container - move text down */}
            <p className="text-xs md:text-sm font-normal leading-loose text-left relative z-10 top-6">
              ALLOW A.I.
              <br />
              ACCESS GALLERY
            </p>

            {/* Line image - stays in place */}
            <Image
              src="/Group 39690.svg"
              alt="Line"
              width={66.33}
              height={59.37}
              className="absolute hidden md:block md:left-[120] md:bottom-[39] z-0 rotate-180"
            />
          </div>
        </div>
        </div>
      )}
        

        {/* Preview Box (Top Right) */}
   

  <div className="absolute top-10 right-10 z-30">
    <PreviewBox imageSrc={selectedImage} />
  </div>


        {/* Input Image */}
        <input
          accept="image/*"
          className="hidden"
          type="file"
          onChange={handleFileChange}
        />
  

{/* Footer / Back */}
      <FooterBackButton />

      {/* Camera Modal */}
      {isCameraModalOpen && (
        <CameraModal onAccept={handleAcceptCamera} onDeny={handleDenyCamera} />
      )}
    </div>
  );
}
