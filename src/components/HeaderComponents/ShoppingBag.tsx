import { ShoppingBag as Bag, X } from "lucide-react";
import { useOverlay } from "../../contexts/OverlayContext";
import { useEffect, useState } from "react";

const ShoppingBag = () => {
  const { isOverlayVisible, showOverlay, hideOverlay } = useOverlay();
  const [quantity, setQuantity] = useState<number>(0);
  const [showCart, setShowCart] = useState<boolean>(false);

  useEffect(() => {
    if (showCart && !isOverlayVisible) {
      setShowCart(false);
    }
  }, [isOverlayVisible]);

  return (
    <>
      <button
        className="icon relative"
        aria-label="open shopping bag"
        onClick={() => {
          showOverlay();
          setShowCart(true);
        }}
      >
        <Bag className="size-6" />
        <div className="absolute bottom-1 right-1 flex h-3 w-3 items-center justify-center rounded-full bg-inherit ring-1 ring-black lg:bottom-2 lg:right-2">
          <span className="font-overlock-black text-xs xl:ml-[1px]">
            {quantity}
          </span>
        </div>
      </button>
      <div
        className={`absolute ${showCart ? "translate-x-0" : "translate-x-full"} right-0 top-0 z-priority h-dvh w-full bg-warm-nude-200 transition-transform duration-500 ease-in-out md:w-1/2 lg:w-1/4`}
      >
        <X
          className="absolute m-1 size-12"
          onClick={() => {
            hideOverlay();
          }}
        />
      </div>
    </>
  );
};

export default ShoppingBag;
