import { useEffect, useState } from "react";
import html2canvas from "html2canvas";

export default function CaptureCanvas ({ onCapture }) {
  useEffect(() => {
    const captureAndRender = async () => {
      const captureCanvas = await html2canvas(document.body);
      const capturedImage = captureCanvas.toDataURL();
      onCapture(capturedImage);
    };

    captureAndRender();
  }, [onCapture]);

  return null; // No need to render anything here
};

