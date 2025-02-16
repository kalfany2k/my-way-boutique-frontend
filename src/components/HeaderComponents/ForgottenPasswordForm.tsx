import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useOverlay } from "../../contexts/OverlayContext";
import apiClient from "../../services/apiClient";
import { Mail } from "lucide-react";

const formSchema = z.object({
  email: z
    .string()
    .min(1, "Camp obligatoriu")
    .email("Adresa de e-mail invalida")
    .max(50, "Adresa trebuie sa aiba cel mult 50 de caractere"),
});

type FormFields = z.infer<typeof formSchema>;

interface Props {
  setForgottenPassword: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginForm: React.FC<Props> = ({ setForgottenPassword, setIsLoading }) => {
  const { hideOverlay } = useOverlay();
  const [error, setError] = useState<string | null>(null);
  const [resetSuccess, setResetSuccess] = useState<string | null>(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormFields>({ resolver: zodResolver(formSchema) });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("email", data.email);
      const response = await apiClient.post("/users/reset-password", formData);
      if (response.status === 200) setResetSuccess(response.data.detail);
      setIsLoading(false);
    } catch (error) {
      error instanceof Error
        ? setError(error.message)
        : setError("O eroare neasteptata s-a intamplat");
    }
  };

  return (
    <form className="login-container" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex w-full flex-col items-center justify-center">
        <label className="ml-10 self-start">Adresa de e-mail</label>
        {errors.email && (
          <p className="mb-1 ml-10 self-start text-sm text-red-500">
            {errors.email.message}
          </p>
        )}
        <div className="relative flex w-10/12 flex-row items-center">
          <input
            {...register("email")}
            type="text"
            className="login-entry"
            autoComplete="email"
          />
          <Mail className="absolute right-3" size={24} />
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-center">
        {resetSuccess && (
          <span className="px-12 text-center text-green-500">
            {resetSuccess}
          </span>
        )}
        <div className="flex w-2/5 flex-col">
          {error && <span className="text-center text-red-500">{error}</span>}
          <button
            type="submit"
            className="my-2 rounded-2xl bg-rose-200 px-4 py-2 text-2xl"
          >
            Reseteaza
          </button>
          <span
            className="w-full cursor-pointer text-center text-gray-500"
            onClick={() => setForgottenPassword(false)}
          >
            Logheaza-te
          </span>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
