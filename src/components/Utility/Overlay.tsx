import React from "react";
import { useOverlay } from "../../contexts/OverlayContext";

const Overlay: React.FC = () => {
  const { isOverlayVisible, hideOverlay } = useOverlay();
  return (
    <div
      className={`fixed inset-0 z-overlay ${isOverlayVisible ? "bg-black/20" : "pointer-events-none bg-black/0"} transition-colors duration-500 ease-in-out`}
      onClick={hideOverlay}
    />
  );
};

export default Overlay;
