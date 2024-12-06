import { useEffect, useState } from "react";
import apiClient from "../../services/api-client";
import Cookies from "js-cookie";
import { useUser } from "../../contexts/UserContext";
import { Trash } from "lucide-react";
import { CartItem, useCart } from "../../contexts/CartContext";

const ShoppingList = () => {
  const { cartItems, setCartItems, addCartItem, deleteCartItem } = useCart();
  const [authToken, setAuthToken] = useState<string | null>(null);
  const { user } = useUser();

  // the retrieveCart function is called upon each time the page refreshes or the user logs in or out, TBD further functionality
  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) setAuthToken(token);
    console.log(cartItems);
    if (authToken) {
      retrieveCart();
    } else {
      setCartItems([]);
    }
  }, [user]);

  // retrieveCart simply returns the current user's cart based on his JWT token's user id
  const retrieveCart = async () => {
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
    <div className="mx-4 flex h-full w-full flex-col items-center">
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
          <div key={index} className="relative mb-4 flex h-24 w-4/5 flex-row">
            <div className="aspect-square w-1/4 bg-rose-200"></div>
            <div className="flex flex-col items-center">
              <span>{cartItem.product_name}</span>
              <span>{cartItem.quantity}</span>
            </div>
            <Trash
              className="absolute bottom-0 right-0 m-1 cursor-pointer"
              onClick={() => handleDeleteItem(cartItem.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShoppingList;
