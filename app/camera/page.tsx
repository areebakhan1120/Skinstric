"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import CameraVideo from "./CameraVideo";
import LoadingOverlay from "./LoadingOverlay";
import CameraControls from "./CameraControls";
import CapturedImageOverlay from "./CapturedImageOverlay";
import ErrorOverlay from "./ErrorOverlay";

export default function CameraPage() {
  const videoRef = useRef<HTMLVideoElement>(null!);
  const streamRef = useRef<MediaStream | null>(null);
  const loadingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [hasStream, setHasStream] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Start the camera immediately (internal helper)
  const startCameraNow = useCallback(async () => {
    try {
      setError(null);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
        streamRef.current = null;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: false });
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setHasStream(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError("Could not access camera. Please allow permissions.");
      // If starting fails, ensure loading stops
      setIsLoading(false);
    }
  }, []);

  // Schedule camera start after a delay (default 5s loading overlay)
  const scheduleStartCamera = useCallback((delay = 5000) => {
    // Clear any previous attempt
    if (loadingTimerRef.current) {
      clearTimeout(loadingTimerRef.current);
      loadingTimerRef.current = null;
    }

    // Stop any existing stream before scheduling new one
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }

    loadingTimerRef.current = setTimeout(async () => {
      // Show loading before starting camera
      setIsLoading(true);
      // Try to start camera after delay
      await startCameraNow();
      // Ensure loading overlay hides after the minimum period
      setIsLoading(false);
      loadingTimerRef.current = null;
    }, delay);
  }, [startCameraNow]);

  // Stops the camera stream
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setHasStream(false);
  };

  const takePicture = () => {
    const video = videoRef.current;
    if (!video || video.videoWidth === 0) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d")?.drawImage(video, 0, 0, canvas.width, canvas.height);
    setCapturedImage(canvas.toDataURL("image/png"));

    stopCamera();
  };

  const handleRetake = () => {
    setCapturedImage(null);
    // Start immediately on retake (no 5s wait)
    scheduleStartCamera(0);
  };

  useEffect(() => {
    // On mount, show the loading overlay and start camera after 5s
    scheduleStartCamera(5000);

    return () => {
      // Cleanup any pending timers and stop camera
      if (loadingTimerRef.current) {
        clearTimeout(loadingTimerRef.current);
        loadingTimerRef.current = null;
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
        streamRef.current = null;
      }
    };
  }, [scheduleStartCamera]);



  return (
    <div className="md:h-[85vh] h-[65vh] bg-white flex items-center justify-center relative">
      <CameraVideo videoRef={videoRef} hasStream={hasStream} capturedImage={capturedImage} isLoading={isLoading} />
      <LoadingOverlay isLoading={isLoading && !capturedImage} />
      <CameraControls takePicture={takePicture} hasStream={hasStream && !capturedImage && !isLoading} />
    {capturedImage && (
  <CapturedImageOverlay
    capturedImage={capturedImage}
    handleRetake={handleRetake}
    setError={setError}
    stopCamera={stopCamera} // pass the stopCamera function here
  />
)}
      <ErrorOverlay error={error} />
    </div>
  );
}
