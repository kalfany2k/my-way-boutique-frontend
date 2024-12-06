import apiClient from "./api-client";
import { FormFields } from "../components/StoreFront/ShoppingForm";
import Cookies from "js-cookie";
import { CartItem } from "../contexts/CartContext";
import { AxiosResponse } from "axios";

type FormData = FormFields;

export async function postCartItem(
  data: FormData,
  product_id: string,
  product_name: string,
): Promise<AxiosResponse> {
  const formData = new FormData();

  formData.append("product_id", product_id);

  formData.append("product_name", product_name);

  formData.append("quantity", data.quantity.toString());

  if (data.name) {
    formData.append("personalised_name", data.name);
  }

  if (data.date) {
    formData.append("personalised_date", data.date.toString());
  }

  if (data.message) {
    formData.append("personalised_message", data.message);
  } else if (data.smallMessage) {
    formData.append("personalised_message", data.smallMessage);
  }

  if (data.size) {
    formData.append("personalised_size", data.size);
  }

  if (data.familyMember) {
    formData.append("personalised_member", data.familyMember);
  }

  return apiClient.post("/carts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${Cookies.get("authToken")}`,
    },
  });
}
