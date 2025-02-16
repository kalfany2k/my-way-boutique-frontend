import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useOverlay } from "../../contexts/OverlayContext";
import { login } from "../../services/auth";
import { useUser } from "../../contexts/UserContext";
import Cookies from "js-cookie";
import { LockKeyhole, Mail } from "lucide-react";
import { cookieUrl } from "../../services/apiClient";
import Spinner from "../Utility/Spinner";

const formSchema = z.object({
  email: z
    .string()
    .min(1, "Camp obligatoriu")
    .email("Adresa de e-mail invalida")
    .max(50, "Adresa trebuie sa aiba cel mult 50 de caractere"),
  password: z.string().min(1, "Camp obligatoriu"),
  keepLoggedIn: z.boolean(),
});

type FormFields = z.infer<typeof formSchema>;

interface Props {
  setForgottenPassword: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginForm: React.FC<Props> = ({ setForgottenPassword, setIsLoading }) => {
  const { hideOverlay } = useOverlay();
  const { setUser, setUserLong } = useUser();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormFields>({ resolver: zodResolver(formSchema) });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      setIsLoading(true);
      const response = await login(data.email, data.password);
      // if login was successful, by now the authToken would have been updated
      // then, update the session/local storage with the User object, alongside the stateful user we will be using
      data.keepLoggedIn ? setUserLong(response.user) : setUser(response.user);
      setError(null);
      hideOverlay();
    } catch (error) {
      error instanceof Error
        ? setError(error.message)
        : setError("O eroare neasteptata s-a intamplat");
    } finally {
      setIsLoading(false);
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

        <label className="ml-10 self-start">Parola</label>
        {errors.password && (
          <p className="mb-1 ml-10 self-start text-sm text-red-500">
            {errors.password.message}
          </p>
        )}
        <div className="relative flex w-10/12 flex-row items-center">
          <input
            {...register("password")}
            type="password"
            className="login-entry"
            autoComplete="current-password"
          />
          <LockKeyhole className="absolute right-3" size={24} />
        </div>

        <div className="my-2 flex w-full flex-row">
          <label className="ml-10 self-start">Tine minte detaliile</label>
          <input
            {...register("keepLoggedIn")}
            type="checkbox"
            className="ml-1 w-8"
            defaultChecked={false}
          />
        </div>
      </div>
      <div className="flex flex-col">
        {error && <span className="text-center text-red-500">{error}</span>}
        <button
          type="submit"
          className="my-2 rounded-2xl bg-rose-200 px-4 py-2 text-2xl"
        >
          Trimite
        </button>
        <span
          className="w-full cursor-pointer text-center text-gray-500"
          onClick={() => setForgottenPassword(true)}
        >
          Ai uitat parola?
        </span>
      </div>
    </form>
  );
};

export default LoginForm;
