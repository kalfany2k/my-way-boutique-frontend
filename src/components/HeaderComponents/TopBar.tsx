import { Menu, ArrowUpFromLine } from "lucide-react";
import { useEffect, useState } from "react";
import { useOverlay } from "../../contexts/OverlayContext";

const TopBar = () => {
  const [topBarOpen, setTopBarOpen] = useState<boolean>(false);
  const { showOverlay, hideOverlay, isOverlayVisible } = useOverlay();

  useEffect(() => {
    if (topBarOpen && !isOverlayVisible) {
      setTopBarOpen(false);
    }
  }, [isOverlayVisible]);

  return (
    <div className="block lg:hidden">
      <Menu
        className="ml-2 size-12"
        onClick={() => {
          setTopBarOpen(!topBarOpen);
          showOverlay();
        }}
      />
      <div
        className={`fixed ${topBarOpen ? "-translate-y-0" : "-translate-y-full"} top-0 z-priority flex h-96 w-screen flex-col items-center justify-end bg-rosy-nude-200 transition-transform duration-500 ease-in-out`}
      >
        <ArrowUpFromLine
          className="m-2 size-12 rounded-full border border-gray-700 bg-warm-nude-400 p-1"
          onClick={() => {
            setTopBarOpen(!topBarOpen);
            hideOverlay();
          }}
        />
      </div>
    </div>
  );
};

export default TopBar;
