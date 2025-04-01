import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, ShieldAlert } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z
  .object({
    resetPassword: z
      .string()
      .min(8, "Parola trebuie sa aiba minim 8 caractere")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])[^\s]{8,}$/,
        "Parola trebuie sa contina cel putin o litera mare, o litera mica, un numar si un caracter special (e.g. !@#$%)",
      ),
    confirmResetPassword: z.string(),
  })
  .refine((data) => data.resetPassword === data.confirmResetPassword, {
    message: "Parolele trebuie sa se potriveasca",
    path: ["confirmPassword"],
  });

type FormFields = z.infer<typeof formSchema>;

const ForgottenPasswordPage = () => {
  const [seeResetPassword, toggleSeeResetPassword] = useState<boolean>(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormFields>({
    resolver: zodResolver(formSchema),
  });

  return (
    <div className="flex h-page-height items-center justify-center">
      <div className="grid h-1/2 w-1/5 grid-rows-5 divide-y-[1px] divide-black rounded-lg ring-1 ring-black">
        <div className="row-span-1 flex items-center justify-center">
          <ShieldAlert size={56} strokeWidth={1.25} />
        </div>
        <div className="row-span-4 flex flex-col items-center">
          <span className="mt-2 font-nunito-regular text-2xl">
            Schimba parola
          </span>

          <span className="mt-1 w-10/12 text-center">
            Completeaza campurile de mai jos pentru a iti schimba parola
          </span>

          <div className="relative mt-4 flex h-12 w-4/5 items-center overflow-hidden rounded-md ring-1 ring-gray-400">
            <input
              {...register("resetPassword")}
              type={seeResetPassword ? "text" : "password"}
              className="h-full w-full pl-2 pr-10 text-lg"
            />
            {seeResetPassword ? (
              <EyeOff
                className="absolute right-2 z-10"
                size={24}
                onClick={() => toggleSeeResetPassword(false)}
              />
            ) : (
              <Eye
                className="absolute right-2 z-10"
                size={24}
                onClick={() => toggleSeeResetPassword(true)}
              />
            )}
          </div>

          <div className="relative mt-3 flex h-12 w-4/5 items-center overflow-hidden rounded-md ring-1 ring-gray-400">
            <input
              {...register("confirmResetPassword")}
              type={seeResetPassword ? "text" : "password"}
              className="h-full w-full pl-2 pr-10 text-lg"
            />
            {seeResetPassword ? (
              <EyeOff
                className="absolute right-2 z-10"
                size={24}
                onClick={() => toggleSeeResetPassword(false)}
              />
            ) : (
              <Eye
                className="absolute right-2 z-10"
                size={24}
                onClick={() => toggleSeeResetPassword(true)}
              />
            )}
          </div>

          <div className="relative mt-3 flex h-12 w-4/5 cursor-pointer items-center justify-center overflow-hidden rounded-md bg-rose-200">
            <span className="font-nunito-medium text-2xl">Trimite</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgottenPasswordPage;
