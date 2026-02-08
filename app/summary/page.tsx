

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface DemographicsData {
  race: Record<string, number>;
  age: Record<string, number>;
  gender: Record<string, number>;
}

export default function SummaryPage() {
  const [data, setData] = useState<DemographicsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<"race" | "age" | "gender">("race");
  const [animatedValue, setAnimatedValue] = useState(0);
  
  // State for the specific item selected in the circle graph (e.g. "Black", "20-29")
  const [selectedStat, setSelectedStat] = useState<{ label: string; value: number } | null>(null);

  useEffect(() => {
    const fetchDemographics = async () => {
      try {
        const capturedImage = localStorage.getItem("capturedImage");
        if (!capturedImage) {
          throw new Error("No image found. Please go back and capture an image.");
        }

        // Ensure we have the base64 part only if it's a data URL
        const base64String = capturedImage.includes("base64,")
          ? capturedImage.split("base64,")[1]
          : capturedImage;

        const response = await fetch(
          "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ image: base64String }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to analyze image");
        }

        const result = await response.json();
        setData(result.data);
      } catch (err: unknown) {
        console.error(err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchDemographics();
  }, []);

  // Update selectedStat when data or category changes
  useEffect(() => {
    if (data && selectedCategory) {
       const list = Object.entries(data[selectedCategory]).sort((a, b) => b[1] - a[1]);
       if (list.length > 0) {
         setSelectedStat({ label: list[0][0], value: list[0][1] });
       }
    }
  }, [data, selectedCategory]);

  // Animate the value whenever selectedStat changes
  useEffect(() => {
    if (!selectedStat) return;

    const startValue = animatedValue;
    const endValue = selectedStat.value;
    const startTime = performance.now();
    const duration = 800; // ms

    let animationFrameId: number;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      
      const current = startValue + (endValue - startValue) * ease;
      setAnimatedValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [selectedStat]);


  // Helper to get data for the currently selected category
  const getCurrentCategoryData = () => {
    if (!data) return [];
    return Object.entries(data[selectedCategory]).sort((a, b) => b[1] - a[1]);
  };

  const currentList = getCurrentCategoryData();
  const formatPercentage = (val: number) => Math.round(val * 100);

  const titleCase = (str: string) => {
    return str.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  };
  
  // Dynamic Progress Bar Component
  const CircularProgress = ({ value }: { value: number }) => {
    const radius = 180; // Large radius for crispness
    const stroke = 12;  // Thickness
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - value * circumference;


    

    return (
      <div className="relative flex items-center justify-center w-full h-full">
        <svg
          height="100%"
          width="100%"
          viewBox={`0 0 ${radius * 2} ${radius * 2}`}
          className="transform -rotate-90"
        >
          <circle
            stroke="#E5E7EB" // gray-200
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke="black" // Primary color
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-xl font-bold animate-pulse">ANALYZING...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-red-500 font-bold">{error}</p>
        <Link href="/result" className="underline">Go Back</Link>
      </div>
    );
  }

  // Derive top stats just for category selection preview (optional, but requested layout is fixed)
  const topRace = data ? (() => {const l = Object.entries(data.race).sort((a,b)=>b[1]-a[1]); return {label: l[0]?.[0]??'-', value: l[0]?.[1]??0}})() : { label: "-", value: 0 };
  const topAge = data ? (() => {const l = Object.entries(data.age).sort((a,b)=>b[1]-a[1]); return {label: l[0]?.[0]??'-', value: l[0]?.[1]??0}})() : { label: "-", value: 0 };
  const topGender = data ? (() => {const l = Object.entries(data.gender).sort((a,b)=>b[1]-a[1]); return {label: l[0]?.[0]??'-', value: l[0]?.[1]??0}})() : { label: "-", value: 0 };

  const currentDisplayStat = selectedStat || { label: "-", value: 0 };
  const displayLabel = selectedCategory === 'age' ? currentDisplayStat.label : titleCase(currentDisplayStat.label);

  return (
    <div className="min-h-screen md:h-[90vh] flex flex-col md:mt-5 transition-all duration-500 ease-in-out">
      <main className="flex-1 w-full bg-white md:overflow-hidden">
        {/* Title */}
        <div className="md:h-full max-w-full mx-5 px-4 md:px-auto flex flex-col">
          <div className="text-start ml-4 mb-4 md:mb-10 md:ml-0">
            <h2 className="text-base md:text-base font-semibold mb-1 leading-[24px]">
              A.I Analysis
            </h2>
            <h3 className="text-4xl md:text-[72px] font-normal leading-[64px] tracking-tighter">
              Demographics
            </h3>
            <h4 className="text-sm mt-2 leading-[24px]">
              Predicted {titleCase(selectedCategory)}
            </h4>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-[1.5fr_8.5fr_3.15fr] gap-4 mt-10 mb-40 md:gap-4 pb-0 md:pb-0 md:mb-0">
            <div className="bg-white-100 space-y-3 md:flex md:flex-col h-[62%]">
              {/* Categories */}
              <div 
                className={`p-3 cursor-pointer flex-1 flex flex-col justify-between border-t transition-colors ${selectedCategory === 'race' ? 'bg-[#1A1B1C] text-white hover:bg-black' : 'bg-[#F3F3F4] text-black hover:bg-[#E1E1E2]'}`}
                onClick={() => setSelectedCategory('race')}
              >
                <p className="text-base font-semibold">{titleCase(topRace.label)}</p>
                <h4 className="text-base font-semibold mb-1">Race</h4>
              </div>
              <div 
                className={`p-3 cursor-pointer flex-1 flex flex-col justify-between border-t transition-colors ${selectedCategory === 'age' ? 'bg-[#1A1B1C] text-white hover:bg-black' : 'bg-[#F3F3F4] text-black hover:bg-[#E1E1E2]'}`}
                onClick={() => setSelectedCategory('age')}
              >
                <p className="text-base font-semibold">{topAge.label}</p>
                <h4 className="text-base font-semibold mb-1">Age</h4>
              </div>
              <div 
                 className={`p-3 cursor-pointer flex-1 flex flex-col justify-between border-t transition-colors ${selectedCategory === 'gender' ? 'bg-[#1A1B1C] text-white hover:bg-black' : 'bg-[#F3F3F4] text-black hover:bg-[#E1E1E2]'}`}
                 onClick={() => setSelectedCategory('gender')}
              >
                <p className="text-base font-semibold">{titleCase(topGender.label)}</p>
                <h4 className="text-base font-semibold mb-1">Sex</h4>
              </div>
            </div>
            
            {/* Circle Graph */}
            <div className="relative bg-gray-100 p-4 flex flex-col items-center justify-center md:h-[57vh] md:border-t">
              <p className="hidden md:block md:absolute text-[40px] mb-2 left-5 top-2">
                {displayLabel}
              </p>
              <div className="relative md:absolute w-full max-w-[384px] aspect-square mb-4 md:right-5 md:bottom-2">
                  <CircularProgress value={animatedValue} />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <p className="text-3xl md:text-[40px] font-normal">
                      {formatPercentage(currentDisplayStat.value)}<span className="absolute text-xl md:text-3xl">%</span>
                    </p>
                  </div>
                </div>

              <p className="md:absolute text-xs text-[#A0A4AB] md:text-sm lg:text-base font-normal mb-1 leading-[24px] md:bottom-[-15%] md:left-[22%] lg:left-[30%] xl:left-[40%] 2xl:left-[45%]">
                If A.I. estimate is wrong, select the correct one.
              </p>
            </div>

            {/* Summary Box */}
            <div className="bg-gray-100 pt-4 pb-4 md:border-t md:overflow-y-auto md:max-h-[57vh]">
              <div className="space-y-0">
                <div className="flex justify-between px-4 sticky top-0 bg-gray-100 pb-2 border-b mb-2 z-10">
                  <h4 className="text-base leading-[24px] tracking-tight font-semibold mb-2 uppercase">
                    {titleCase(selectedCategory)}
                  </h4>
                  <h4 className="text-base leading-[24px] tracking-tight font-semibold mb-2 uppercase">
                    A.I. Confidence
                  </h4>
                </div>

                {currentList.map(([label, score]) => (
                  <div 
                    key={label} 
                    className={`flex items-center justify-between h-[48px] px-4 cursor-pointer transition-colors ${selectedStat?.label === label ? 'bg-[#1A1B1C] text-white' : 'hover:bg-[#E1E1E2]'}`}
                    onClick={() => setSelectedStat({ label, value: score })}
                  >
                    <div className="flex items-center gap-1">
                      <Image
                        src="/radio-button.svg"
                        alt="Radio Button"
                        width={12}
                        height={12}
                        className="w-[12px] h-[12px] mr-2"
                      />
                      <span className="font-normal text-base leading-6 tracking-tight">
                        {selectedCategory === 'age' ? label : titleCase(label)}
                      </span>
                    </div>
                    <span className="font-normal text-base leading-6 tracking-tight">
                      {formatPercentage(score)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-4 md:pt-[37px] pb-6 bg-white sticky bottom-40 md:static md:bottom-0 mb-8 md:mb-16">
            <div className="flex justify-between max-w-full mx-auto px-4 md:px-0">
              <Link href="/select">
                <div>
                  <div className="relative w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[1] sm:hidden">
                    <span className="rotate-[-45deg] text-xs font-semibold sm:hidden">
                      BACK
                    </span>
                  </div>
                  <div className="group hidden sm:flex flex-row relative justify-center items-center">
                    <div className="w-12 h-12 hidden sm:flex justify-center border border-[#1A1B1C] rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300"></div>
                    <span className="absolute left-[15px] bottom-[13px] scale-[0.9] rotate-180 hidden sm:block group-hover:scale-[0.92] ease duration-300">
                      ▶
                    </span>
                    <span className="text-sm font-semibold hidden sm:block ml-6 ">BACK</span>
                  </div>
                </div>
              </Link>
           
                <div>
                  <div className=" w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[1] sm:hidden">
                    <span className="rotate-[-45deg] text-xs font-semibold sm:hidden">
                      HOME
                    </span>
                  </div>
                  <div className="hidden sm:flex flex-row relative justify-center items-center">
                     <Link href="/">
                         <button className="px-4 py-2 mx-4 border border-black bg-gray-200 text-gray-800 cursor-pointer hover:bg-gray-300 shadow-md text-sm">
                      RESET
                    </button>
                    </Link>
                    <button className= "px-6 py-2 bg-[#1A1B1C] text-[#FCFCFC] cursor-pointer hover:bg-gray-800 shadow-md text-sm">
                      CONFIRM
                    </button>
                 
               
                  </div>
                </div>
      
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
