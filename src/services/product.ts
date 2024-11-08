import apiClient from "./api-client";
import { FormFields } from "../components/Dashboard/ProductForm";
import Cookies from "js-cookie";

type FormData = FormFields;

export async function postProduct(data: FormData): Promise<Response> {
  const formData = new FormData();

  formData.append("id", data.id);
  formData.append("name", data.name);
  formData.append("item_gender", data.item_gender);
  data.categories.forEach((category) =>
    formData.append("categories", category),
  );
  formData.append("type", data.type);
  formData.append("price", data.price.toString());

  if (data.primary_image.length > 0) {
    formData.append("primary_image", data.primary_image[0]);
  }

  if (data.secondary_images.length > 0) {
    Array.from(data.secondary_images).forEach((image, _) => {
      formData.append(`secondary_images`, image);
    });
  }

  return apiClient.post("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${Cookies.get("authToken")}`,
    },
  });
}
