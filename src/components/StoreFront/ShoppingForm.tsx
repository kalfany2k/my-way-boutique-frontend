import { z } from "zod";
import { ProductData } from "./ProductGrid";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { ro } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { CalendarFold, Minus, Plus } from "lucide-react";
import { AxiosError } from "axios";
import { postCartItem } from "../../services/cart";
import { useCart } from "../../contexts/CartContext";

const baseSchema = z.object({
  name: z.string().optional(),
  date: z.date().optional(),
  message: z
    .string()
    .max(200, "Mesajul nu poate avea mai mult de 200 de caractere")
    .optional(),
  smallMessage: z
    .string()
    .max(100, "Mesajul nu poate avea mai mult de 100 de caractere")
    .optional(),
  size: z.string().optional(),
  familyMember: z.string().optional(),
  additionalDetails: z.string().optional(),
  quantity: z
    .number()
    .min(1, "Trebuie sa adaugati minim un produs in cos")
    .max(100, "Puteti adauga maxim 100 de produse de acelasi tip"),
});

export type FormFields = z.infer<typeof baseSchema>;

interface Props {
  product: ProductData;
}

const ShoppingForm: React.FC<Props> = ({ product }) => {
  const [fields, setFields] = useState<string[]>([]);
  const [calendarOpen, setCalendarOpen] = useState<boolean>(false);
  var date = new Date();
  var todayDate = moment(date).format("DD/MM/YYYY");
  const { addCartItem, cartItems } = useCart();

  useEffect(() => {
    switch (product.type) {
      case "trusou":
        setFields(["name", "date", "message"]);
        break;
      case "tricou":
        setFields(["name", "date", "message", "size", "familyMember"]);
        break;
      case "lumanare":
        setFields(["name", "date", "smallMessage"]);
        break;
      case "haina":
        setFields(["name", "size"]);
        break;
      case "prosop":
        setFields(["name", "broidery", "smallMessage"]);
        break;
      case "tava":
        setFields(["name", "date", "message"]);
        break;
      default:
        setFields([]);
        break;
    }
  }, []);

  // prettier-ignore
  const {register, control, handleSubmit, reset, setValue, watch, formState: { errors }} = useForm<FormFields>(
    { 
      resolver: zodResolver(baseSchema),
      defaultValues: {
        message: "",
        smallMessage: "",
      }
    }
  );

  const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
    try {
      const response = await postCartItem(data, product.id, product.name);
      addCartItem(response.data.item);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddQuantity = () => {
    const currentQuantity = watch("quantity");
    if (currentQuantity < 25) {
      setValue("quantity", currentQuantity + 1);
    }
  };

  const handleDeductQuantity = () => {
    const currentQuantity = watch("quantity");
    if (currentQuantity > 1) {
      setValue("quantity", currentQuantity - 1);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.includes("name") && (
        <div className="mb-2 mt-3 flex w-52 flex-col">
          <label className="text-xl">Numele copilului</label>
          <input
            {...register("name")}
            required={true}
            placeholder="ex. Andrei"
            className="rounded-md p-1 text-base shadow-lg focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>
      )}
      {fields.includes("date") && (
        <div className="mb-2 flex flex-col justify-center">
          <div className="flex flex-row items-center">
            <label className="text-xl">Data evenimentului</label>
            <CalendarFold size={24} className="mb-1 ml-1" />
          </div>
          <Controller
            control={control}
            name="date"
            render={({ field: { onChange, value } }) => (
              <div
                className="flex w-fit flex-row items-center"
                onClick={() => setCalendarOpen(true)}
              >
                <DatePicker
                  onChange={onChange}
                  selected={value}
                  locale={ro}
                  open={calendarOpen}
                  placeholderText={"ex. " + todayDate}
                  dateFormat="dd/MM/yyyy"
                  className="w-52 rounded-md p-1 shadow-lg focus:outline-none focus:ring-1 focus:ring-black"
                  onClickOutside={() => setCalendarOpen(false)}
                />
              </div>
            )}
          />
        </div>
      )}

      {errors.message && (
        <span className="text-rose-600">{errors.message.message}</span>
      )}

      {fields.includes("message") && (
        <div className="mb-2 flex w-72 flex-col">
          <label className="text-xl">Mesaj personalizat</label>
          <Controller
            control={control}
            name="message"
            render={({ field: { onChange, value } }) => (
              <textarea
                onChange={onChange}
                value={value}
                rows={4}
                cols={90}
                placeholder="Introdu un mesaj pentru cel mic"
                className="resize-none rounded-md p-1 shadow-lg focus:outline-none focus:ring-1 focus:ring-black"
              />
            )}
          />
        </div>
      )}

      {errors.smallMessage && (
        <span className="text-rose-600">{errors.smallMessage.message}</span>
      )}

      {fields.includes("smallMessage") && (
        <div className="mb-2 flex w-72 flex-col">
          <label className="text-xl">Mesaj personalizat</label>
          <Controller
            control={control}
            name="smallMessage"
            render={({ field: { onChange, value } }) => (
              <textarea
                onChange={onChange}
                value={value}
                rows={3}
                cols={70}
                placeholder="Introdu un mesaj pentru cel mic"
                className="resize-none rounded-md p-1 shadow-lg focus:outline-none focus:ring-1 focus:ring-black"
              />
            )}
          />
        </div>
      )}

      {errors.quantity && (
        <span className="text-rose-600">{errors.quantity.message}</span>
      )}

      <div className="flex flex-row items-center">
        <div className="mr-2 flex select-none flex-row items-center divide-x-[1px] divide-black rounded-lg bg-white shadow-lg">
          <div className="flex h-8 w-8">
            <Plus
              size={24}
              className="m-auto cursor-pointer"
              onClick={handleAddQuantity}
            />
          </div>
          <input
            type="text"
            {...register("quantity", {
              setValueAs: (v) => parseInt(v),
              onChange: (e) => {
                const value = e.target.value.replace(/[^0-9]/g, "");
                setValue("quantity", parseInt(value) || 0);
              },
            })}
            defaultValue={1}
            className={`h-8 w-8 bg-white text-center text-xl focus:outline-none`}
            placeholder="1"
          />
          <div className="flex h-8 w-8">
            <Minus
              size={24}
              className="m-auto cursor-pointer"
              onClick={handleDeductQuantity}
            />
          </div>
        </div>
        <button
          type="submit"
          className="rounded-lg bg-warm-nude-400 p-2 shadow-xl transition-colors duration-300 ease-in-out hover:bg-warm-nude-600"
        >
          <span className="font-signika-medium text-xl">Adauga in cos</span>
        </button>
      </div>
    </form>
  );
};

export default ShoppingForm;
