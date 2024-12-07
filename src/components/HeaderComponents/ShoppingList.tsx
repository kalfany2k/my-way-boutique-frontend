import { useEffect, useState } from "react";
import apiClient from "../../services/apiClient";
import Cookies from "js-cookie";
import { useUser } from "../../contexts/UserContext";
import { Trash } from "lucide-react";
import { CartItem, useCart } from "../../contexts/CartContext";
import { ProductData } from "../StoreFront/ProductGrid";
import { Link } from "react-router-dom";

const ShoppingList = () => {
  const { cartItems, setCartItems, addCartItem, deleteCartItem } = useCart();
  const [authToken, setAuthToken] = useState<string | undefined>(undefined);
  const { user } = useUser();

  useEffect(() => {
    const token = Cookies.get("authToken");
    setAuthToken(token);
    if (token) {
      retrieveCart(token);
      console.log(cartItems[0]);
    } else {
      setCartItems([]);
    }
  }, [user]);

  // retrieveCart simply returns the current user's cart based on his JWT token's user id
  const retrieveCart = async (authToken: string) => {
    try {
      const response = await apiClient.get("/carts", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setCartItems(response.data);
    } catch (error) {}
  };

  const handleDeleteItem = async (cartItemId: number) => {
    try {
      const response = await apiClient.delete("/carts", {
        params: { cart_item_id: cartItemId },
        headers: { Authorization: `Bearer ${authToken}` },
      });
      deleteCartItem(cartItemId);
    } catch (error) {}
  };

  return (
    <div className="flex h-full w-full flex-col items-center">
      <span>
        {cartItems.length === 0
          ? "Cosul dumneavoastra de cumparaturi este gol"
          : "In momentul de fata aveti " +
            (cartItems.length === 1
              ? "un produs in cos"
              : cartItems.length + " produse in cos")}
      </span>
      <div className="flex w-full flex-col items-center">
        {cartItems.map((cartItem, index) => (
          <div
            key={index}
            className="relative mb-4 flex h-24 w-11/12 flex-row overflow-hidden rounded-md"
          >
            <div className="aspect-square h-full bg-rose-200"></div>
            <div className="flex flex-1 flex-col items-center justify-between bg-rose-200/25 py-1">
              <Link
                to={`/produse/${cartItem.product_type}/${cartItem.product_id}`}
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
