import { useEffect, useState } from "react";
import apiClient from "../../services/apiClient";
import Cookies from "js-cookie";
import { useUser } from "../../contexts/UserContext";
import { Trash } from "lucide-react";
import { useCart } from "../../contexts/CartContext";
import { Link } from "react-router-dom";
import { useOverlay } from "../../contexts/OverlayContext";
import { AxiosError } from "axios";

const ShoppingList = () => {
  const { cartItems, setCartItems, deleteCartItem } = useCart();
  const { hideOverlay } = useOverlay();
  const [token, setToken] = useState<string | undefined>(undefined);
  const { user } = useUser();

  useEffect(() => {
    const token = Cookies.get("authToken") || Cookies.get("guestSessionToken");
    setToken(token);
    token ? retrieveCart(token) : setCartItems([]);
  }, [user]);

  // retrieveCart simply returns the current user's cart based on his JWT token's user id
  const retrieveCart = async (authToken: string) => {
    try {
      const response = await apiClient.get("/carts", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setCartItems(response.data);
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
      }
    }
  };

  const handleDeleteItem = async (cartItemId: number) => {
    try {
      await apiClient.delete("/carts", {
        params: { cart_item_id: cartItemId },
        headers: { Authorization: token && `Bearer ${token}` },
      });
      deleteCartItem(cartItemId);
    } catch (error) {}
  };

  return (
    <div className="flex h-full w-full flex-col items-center">
      <span>
        {cartItems.length === 0
          ? "Cosul tau de cumparaturi este gol"
          : "In momentul de fata ai " +
            (cartItems.length === 1
              ? "un produs in cos"
              : cartItems.length + " produse in cos")}
      </span>
      <div className="mt-4 flex w-full flex-col items-center">
        {cartItems.map((cartItem, index) => (
          <div
            key={index}
            className="relative mb-4 flex h-24 w-11/12 flex-row overflow-hidden rounded-md"
          >
            <div className="aspect-square h-full bg-rose-200"></div>
            <div className="flex flex-1 flex-col items-center justify-between bg-rose-200/25 py-1">
              <Link
                to={`/produse/${cartItem.product_type}/${cartItem.product_id}`}
                onClick={hideOverlay}
              >
                <span>{cartItem.product_name}</span>
              </Link>
              <span>{}</span>
              <span>{cartItem.quantity} buc.</span>
            </div>
            <Trash
              className="absolute bottom-0 right-0 m-1 cursor-pointer transition-colors duration-150 ease-in-out hover:stroke-red-500"
              onClick={() => handleDeleteItem(cartItem.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShoppingList;
