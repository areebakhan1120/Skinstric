"use client";

import { useState } from "react";
import Link from "next/link";
import Diamonds from "../Component/Diamonds";


export default function TestingPage() {
  const [step, setStep] = useState<"name" | "location" | "loading" | "done">("name");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [apiMessage, setApiMessage] = useState("");
  const [error, setError] = useState("");

  const validateInput = (value: string) => {
    // Regex: No numbers, non-empty
    return value.trim().length > 0 && !/\d/.test(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (step === "name") {
      if (validateInput(name)) {
        setStep("location");
      } else {
        setError("Name must be text only and cannot contain numbers.");
      }
      return;
    }

    if (step === "location") {
      if (!validateInput(location)) {
        setError("Location must be text only and cannot contain numbers.");
        return;
      }

      setStep("loading");

      try {
        const response = await fetch("https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, location }),
        });

        const data = await response.json();
        
        // Check for multiple possible success keys as API response might vary or contain typos
        const successMessage = data.SUCCESS || data.SUCCUSS || data.message;

        if (successMessage) {
          setApiMessage(successMessage);
          setStep("done");
        } else {
          // If the API returns a specific error message, display it
          setError(data.error || "Something went wrong. Please try again.");
          setStep("location");
        }
      } catch (err: Error | unknown) {
        console.error("API Error:", err);
        setError(err instanceof Error ? err.message : "Failed to connect to the server.");
        setStep("location");
      }
    }
  };

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center bg-white text-center relative overflow-hidden">

      {/* Top Left */}
      <div className="absolute top-16 left-9">
        <p className="font-bold">TO START ANALYSIS</p>
      </div>

      {/* Center */}
      <div className="relative flex flex-col items-center justify-center mb-40 w-full h-full">

        {/* Header */}
        {(step === "name" || step === "location") && (
          <p className="text-sm text-gray-400 tracking-wider uppercase mb-1">
            CLICK TO TYPE
          </p>
        )}

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm mb-6 animate-pulse font-medium">
            {error}
          </p>
        )}

        {/* Input / Processing / Thank You */}
        {step === "name" || step === "location" ? (
          <form className="relative z-20" onSubmit={handleSubmit}>
            <input
              type="text"
              value={step === "name" ? name : location}
              placeholder={step === "name" ? "Introduce Yourself" : "Where are you from?"}
              autoFocus
              autoComplete="off"
              onChange={(e) => {
                 setError(""); // Clear error on typing
                 step === "name" ? setName(e.target.value) : setLocation(e.target.value);
              }}
              className={`font-normal text-center bg-transparent border-b border-black
                focus:outline-none pt-1 tracking-[-0.07em] leading-16
                text-[#1A1B1C] z-10
                ${step === "name"
                  ? "text-5xl sm:text-6xl w-[372] sm:w-[432]"
                  : "text-4xl sm:text-5xl w-[400] sm:w-[480]"}`}
            />
            <button type="submit" className="sr-only" />
          </form>
        ) : step === "loading" ? (
          <p className="relative z-20 text-lg uppercase tracking-widest text-gray-400 text-center">
            Processing submission
            <br />
            <span className="inline-flex gap-2 mt-2">
              <span className="text-3xl animate-bounce [animation-delay:0ms]">•</span>
              <span className="text-3xl animate-bounce [animation-delay:150ms]">•</span>
              <span className="text-3xl animate-bounce [animation-delay:300ms]">•</span>
            </span>
          </p>
        ) : (
          <div className="relative z-20 text-center mt-6">
            <p className="text-3xl sm:text-4xl font-medium tracking-wide text-gray-600">
              {apiMessage || "Thank You!"}
            </p>
            <p className="mt-4 text-xl font-light text-gray-600">
              Proceed for the next step.
            </p>
          </div>
        )}

        {/* Diamonds Component */}
        <Diamonds />
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 w-full flex justify-between px-6 md:px-9">

        {/* Back Button */}
        <Link href="/" aria-label="Back">
          <div className="relative flex items-center">
            <div className="relative w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 sm:hidden">
              <span className="-rotate-45 text-xs font-semibold">BACK</span>
            </div>
            <div className="group hidden sm:flex items-center">
              <div className="w-12 h-12 flex justify-center items-center border border-[#1A1B1C] rotate-45 scale-[0.85] group-hover:scale-[0.92] transition duration-300" />
              <span className="absolute left-[18] bottom-[12] rotate-300 scale-[0.9] group-hover:scale-[0.92] transition duration-300">▶</span>
              <span className="text-sm font-semibold ml-6">BACK</span>
            </div>
          </div>
        </Link>

        {/* Proceed Button */}
        {step === "done" && (
          <Link href="/result" aria-label="Proceed">
            <div className="relative flex items-center">
              <div className="relative w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 sm:hidden">
                <span className="-rotate-45 text-xs font-semibold">PROCEED</span>
              </div>
              <div className="group hidden sm:flex items-center">
                <span className="text-sm font-semibold mr-6">PROCEED</span>
                <div className="w-12 h-12 flex justify-center items-center border border-[#1A1B1C] rotate-45 scale-[0.85] group-hover:scale-[0.92] transition duration-300 relative">
                  <span className="rotate-320 scale-[0.9]">▶</span>
                </div>
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
