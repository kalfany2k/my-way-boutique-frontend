import apiClient from "./apiClient";
import { FormFields } from "../components/StoreFront/ShoppingForm";
import Cookies from "js-cookie";
import { AxiosResponse } from "axios";

type FormData = FormFields;

export async function postCartItem(
  data: FormData,
  product_id: string,
): Promise<AxiosResponse> {
  const formData = new FormData();
  formData.append("product_id", product_id);
  formData.append("quantity", data.quantity.toString());

  // Create a personalization object with only the fields that exist
  const personalisedFields: Record<string, string> = {};

  if (data.name) personalisedFields.name = data.name;
  if (data.date) personalisedFields.date = data.date.toString();
  if (data.message) personalisedFields.message = data.message;
  else if (data.smallMessage) personalisedFields.message = data.smallMessage;
  if (data.size) personalisedFields.size = data.size;
  if (data.familyMember) personalisedFields.member = data.familyMember;

  // Convert the object to a JSON string and append it
  formData.append("personalised_fields", JSON.stringify(personalisedFields));

  return apiClient.post("/carts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: Cookies.get("authToken")
        ? `Bearer ${Cookies.get("authToken")}`
        : null,
    },
  });
}

export async function mergeCarts(): Promise<AxiosResponse> {
  return apiClient.post("/carts/merge", {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${Cookies.get("authToken")}`,
    },
  });
}
