import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useOverlay } from "../../contexts/OverlayContext";
import { login } from "../../services/auth";
import { useUser } from "../../contexts/UserContext";
import { mergeCarts } from "../../services/cart";
import Cookies from "js-cookie";

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

const LoginForm = () => {
  const { hideOverlay } = useOverlay();
  const { setUser, setUserLong } = useUser();
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormFields>({ resolver: zodResolver(formSchema) });
  const [forgottenPassword, setForgottenPassword] = useState<boolean>(false);

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const response = await login(data.email, data.password);
      // if login was successful, by now the authToken would have been updated
      data.keepLoggedIn ? setUserLong(response.user) : setUser(response.user);
      // then, update the session/local storage with the User object, alongside the stateful user we will be using
      setError(null);
      hideOverlay();
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
        <input
          {...register("email")}
          type="text"
          className="login-entry"
          autoComplete="email"
        />
        <label className="ml-10 self-start">Parola</label>
        {errors.password && (
          <p className="mb-1 ml-10 self-start text-sm text-red-500">
            {errors.password.message}
          </p>
        )}
        <input
          {...register("password")}
          type="password"
          className="login-entry"
          autoComplete="current-password"
        />
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
          className="my-2 rounded-full bg-rose-200 px-4 py-2 text-2xl"
        >
          Logheaza-te
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
