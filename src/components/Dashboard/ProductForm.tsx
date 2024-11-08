import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
// prettier-ignore
import { candleHolderLit, chest, tieBowRibbon, shirt, towelFolded, jacket } from "@lucide/lab";
// prettier-ignore
import { Box, Gift, Inbox, Search, Paintbrush } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomFileInput from "./CustomFileInput";
import { postProduct } from "../../services/product";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";

const formSchema = z.object({
  id: z
    .string()
    .min(1, "Camp obligatoriu")
    .max(50, "ID-ul trebuie sa aiba cel mult 50 de caractere"),
  name: z
    .string()
    .min(1, "Camp obligatoriu")
    .max(50, "Numele trebuie sa aiba cel mult 50 de caractere"),
  item_gender: z.enum(["F", "M", "U"], {
    errorMap: () => ({ message: "Va rugam selectati un gen" }),
  }),
  categories: z.array(z.string()),
  // prettier-ignore
  type: z.enum(["trusou", "lumanare", "cutie", "accesoriu", "cadou", "tricou", "tava", "haina", "prosop", "perie", "oglinda"], {
    errorMap: () => ({ message: "Tipul articolului este neselectat" }),
  }),
  price: z.preprocess(
    (a) => Number(a),
    z
      .number({ invalid_type_error: "Pretul trebuie sa fie un numar" })
      .positive({ message: "Pretul trebuie sa fie un numar pozitiv" }),
  ),
  primary_image: z
    .custom<FileList>()
    .refine((file) => file?.length === 1, "Selectați o imagine primară")
    .refine(
      (file) => file?.[0]?.size <= MAX_FILE_SIZE,
      `Dimensiunea maximă a fișierului este de 5MB`,
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type),
      "Doar .jpg, .jpeg, .png și .webp sunt acceptate",
    ),
  secondary_images: z
    .custom<FileList>()
    .refine(
      (files) => files?.length <= 5,
      "Puteți încărca maxim 5 imagini adiționale",
    )
    .refine(
      (files) =>
        Array.from(files || []).every((file) => file.size <= MAX_FILE_SIZE),
      `Fiecare fișier trebuie să fie de maxim 5MB`,
    )
    .refine(
      (files) =>
        Array.from(files || []).every((file) =>
          ACCEPTED_IMAGE_TYPES.includes(file.type),
        ),
      "Doar .jpg, .jpeg, .png și .webp sunt acceptate",
    ),
});

export type FormFields = z.infer<typeof formSchema>;

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
// prettier-ignore
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const categories = [
  { name: "Trusou", icon: chest, value: "trusou" },
  { name: "Lumanare", icon: candleHolderLit, value: "lumanare" },
  { name: "Cutie", icon: Box, value: "cutie" },
  { name: "Accesoriu", icon: tieBowRibbon, value: "accesoriu" },
  { name: "Cadou", icon: Gift, value: "cadou" },
  { name: "Tricou", icon: shirt, value: "tricou" },
  { name: "Tava", icon: Inbox, value: "tava" },
  { name: "Haina", icon: jacket, value: "haina" },
  { name: "Prosop", icon: towelFolded, value: "prosop" },
  { name: "Perie", icon: Paintbrush, value: "perie" },
  { name: "Oglinda", icon: Search, value: "oglinda" },
];

const tags = {
  botez: "Botez",
  prima_baie: "Prima baie",
  prima_aniversare: "Prima aniversare",
  imprimate: "Imprimate",
  brodate: "Brodate",
  craciun: "Crăciun",
  paste: "Paște",
};

const genders = ["M", "F", "U"];

const ProductForm = () => {
  const [idError, setIdError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  // prettier-ignore
  const { register, formState: { errors }, handleSubmit, control, reset } = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categories: [],
    },
  });

  useEffect(() => {
    if (submitSuccess) {
      const timer = setTimeout(() => {
        setSubmitSuccess(false);
      }, 2000); // Reset after 2 seconds

      return () => clearTimeout(timer);
    }
  }, [submitSuccess]);

  const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
    try {
      console.log(data);
      setIdError(null);
      setNameError(null);
      const response = await postProduct(data);
      console.log(response);
      reset();
      setSubmitSuccess(true);
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data.detail;
        if (errorMessage.length > 3) {
          errorMessage.split(" ").at(2)?.startsWith("i")
            ? setIdError(errorMessage.toString())
            : setNameError(errorMessage.toString());
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="m-4 flex h-full w-full flex-col"
    >
      <label>Alege codul de identificare al produsului</label>
      <input
        {...register("id")}
        className="mb-2 w-4/5 rounded-lg bg-transparent p-2 text-xl ring-1 ring-orange-400 focus-within:bg-warm-nude-300/50 lg:w-1/2"
        type="text"
      />
      {idError && <span className="text-sm text-red-500">{idError}</span>}
      {errors.id && (
        <span className="text-sm text-red-500">{errors.id.message}</span>
      )}

      <label>Alege titlul produsului</label>
      <input
        {...register("name")}
        className="mb-2 w-4/5 rounded-lg bg-transparent p-2 text-xl ring-1 ring-orange-400 focus-within:bg-warm-nude-300/50 lg:w-1/2"
        type="text"
      />
      {nameError && <span className="text-sm text-red-500">{nameError}</span>}
      {errors.name && (
        <span className="text-sm text-red-500">{errors.name.message}</span>
      )}

      <label>Alege pretul produsului</label>
      <input
        {...register("price")}
        className="mb-2 w-4/5 rounded-lg bg-transparent p-2 text-xl ring-1 ring-orange-400 focus-within:bg-warm-nude-300/50 lg:w-1/2"
        type="number"
        step="0.01"
      />
      {errors.price && (
        <span className="text-sm text-red-500">{errors.price.message}</span>
      )}

      <label>Selecteaza tipul produsului</label>
      <div className="grid w-4/5 grid-cols-3 grid-rows-4 lg:w-1/2">
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <>
              {categories.map((category) => (
                <button
                  key={category.value}
                  type="button"
                  onClick={() => field.onChange(category.value)}
                  className={`category-item flex min-h-[60px] select-none flex-col items-center justify-center rounded-sm p-2 transition-colors duration-300 lg:min-h-0 ${
                    field.value === category.value
                      ? "bg-warm-nude-700 text-white"
                      : "bg-warm-nude-300 hover:bg-warm-nude-400"
                  }`}
                >
                  <span>{category.name}</span>
                </button>
              ))}
            </>
          )}
        />
      </div>
      {errors.type && (
        <span className="text-sm text-red-500">{errors.type.message}</span>
      )}

      <label>Selecteaza categoriile produsului</label>
      <div className="mb-2 grid w-4/5 grid-cols-3 gap-2 lg:w-1/2">
        <Controller
          name="categories"
          control={control}
          render={({ field }) => (
            <>
              {Object.entries(tags).map(([key, value]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    const updatedTags = field.value.includes(key)
                      ? field.value.filter((t) => t !== key)
                      : [...field.value, key];
                    field.onChange(updatedTags);
                  }}
                  className={`category-item flex min-h-[60px] select-none flex-col items-center justify-center rounded-sm p-2 transition-colors duration-300 lg:min-h-0 ${
                    field.value.includes(key)
                      ? "bg-warm-nude-700 text-white"
                      : "bg-warm-nude-300 hover:bg-warm-nude-400"
                  }`}
                >
                  <span>{value}</span>
                </button>
              ))}
            </>
          )}
        />
      </div>
      {errors.categories && (
        <span className="text-sm text-red-500">
          {errors.categories.message}
        </span>
      )}

      <label>Selecteaza genul produsului</label>
      <div className="mb-2 grid w-4/5 grid-cols-3 lg:w-1/2">
        <Controller
          name="item_gender"
          control={control}
          render={({ field }) => (
            <>
              {genders.map((gender) => (
                <button
                  key={gender}
                  type="button"
                  onClick={() => field.onChange(gender)}
                  className={`category-item flex min-h-[60px] select-none flex-col items-center justify-center rounded-sm p-2 transition-colors duration-300 lg:min-h-0 ${
                    field.value === gender
                      ? "bg-warm-nude-700 text-white"
                      : "bg-warm-nude-300 hover:bg-warm-nude-400"
                  }`}
                >
                  <span>{gender}</span>
                </button>
              ))}
            </>
          )}
        />
      </div>
      {errors.item_gender && (
        <span className="text-sm text-red-500">
          {errors.item_gender.message}
        </span>
      )}

      <CustomFileInput
        id="primaryImage"
        label="Imagine primară"
        register={register}
        name="primary_image"
        accept={ACCEPTED_IMAGE_TYPES.join(",")}
        error={errors.primary_image?.message}
        submitSuccess={submitSuccess}
      />

      <CustomFileInput
        id="otherImages"
        label="Alte imagini (maxim 5)"
        register={register}
        name="secondary_images"
        accept={ACCEPTED_IMAGE_TYPES.join(",")}
        multiple
        error={errors.secondary_images?.message}
        submitSuccess={submitSuccess}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-fit rounded-full p-3 transition-colors duration-300 ${
          isSubmitting
            ? "cursor-not-allowed bg-gray-400"
            : submitSuccess
              ? "bg-green-400"
              : "bg-black/25 hover:bg-black/40"
        } `}
      >
        {isSubmitting ? "Submitting..." : "Confirma"}
      </button>
    </form>
  );
};

export default ProductForm;
