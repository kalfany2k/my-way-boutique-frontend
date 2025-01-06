import { ShoppingBag as Bag, X } from "lucide-react";
import { useOverlay } from "../../contexts/OverlayContext";
import { useEffect, useState } from "react";
import ShoppingList from "./ShoppingList";
import { useCart } from "../../contexts/CartContext";

const ShoppingBag = () => {
  const { isOverlayVisible, showOverlay, hideOverlay } = useOverlay();
  const [showCart, setShowCart] = useState<boolean>(false);
  const { cartItems } = useCart();

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
        <div className="absolute bottom-2 right-2 flex h-3 w-3 flex-row items-center justify-center rounded-full bg-inherit ring-1 ring-black">
          <span className="mt-[1px] xl:ml-[1px] text-center font-nunito-regular text-xs">
            {cartItems.length}
          </span>
        </div>
      </button>
      <div
        className={`absolute ${showCart ? "translate-x-0" : "translate-x-full"} right-0 top-0 z-priority flex h-dvh w-full flex-col bg-rosy-nude-200 transition-transform duration-500 ease-in-out sm:w-1/2 md:w-1/3 xl:w-1/4`}
      >
        <X
          className="m-1 size-12"
          onClick={() => {
            hideOverlay();
          }}
        />
        <ShoppingList />
      </div>
    </>
  );
};

export default ShoppingBag;
