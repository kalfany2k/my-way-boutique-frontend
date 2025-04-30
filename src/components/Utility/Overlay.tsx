import React from "react";
import { useOverlay } from "../../contexts/OverlayContext";

const Overlay: React.FC = () => {
  const { isOverlayVisible, hideOverlay } = useOverlay();
  return (
    <div
      className={`absolute z-overlay -mt-10 h-[calc(100dvh+2.5rem)] w-screen ${isOverlayVisible ? "bg-black/20" : "pointer-events-none bg-black/0"} transition-colors duration-500 ease-in-out`}
      onClick={hideOverlay}
    />
  );
};

export default Overlay;
