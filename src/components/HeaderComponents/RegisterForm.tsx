import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useOverlay } from "../../contexts/OverlayContext";
import { login, register as registerUser } from "../../services/auth";
import { useUser } from "../../contexts/UserContext";
import { useState } from "react";
import {
  User,
  LockKeyhole,
  Mail,
  MailCheck,
  LockKeyholeOpen,
} from "lucide-react"; // Import the icons

const formSchema = z
  .object({
    gender: z
      .enum(["F", "M"], {
        required_error: "Va rugam selectati un gen",
      })
      .nullable()
      .refine((val) => val !== null, {
        message: "Va rugam selectati un gen",
      }),
    email: z
      .string()
      .min(1, "Camp obligatoriu")
      .email("Adresa de e-mail invalida")
      .max(50, "Adresa trebuie sa aiba cel mult 50 de caractere"),
    confirmEmail: z.string(),
    surname: z
      .string()
      .min(1, "Camp obligatoriu")
      .max(50, "Campul poate avea maxim 50 de caractere"),
    name: z
      .string()
      .min(1, "Camp obligatoriu")
      .max(50, "Campul poate avea maxim 50 de caractere"),
    password: z
      .string()
      .min(8, "Parola trebuie sa aiba minim 8 caractere")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])[^\s]{8,}$/,
        "Parola trebuie sa contina cel putin o litera mare, o litera mica, un numar si un caracter special (e.g. !@#$%)",
      ),
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val === true, {
      message: "Trebuie sa acceptati termenii si conditiile",
    }),
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: "E-mailurile trebuie sa se potriveasca",
    path: ["confirmEmail"],
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Parolele trebuie sa se potriveasca",
    path: ["confirmPassword"],
  });

type FormFields = z.infer<typeof formSchema>;

interface Props {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegisterForm: React.FC<Props> = ({ setIsLoading }) => {
  const [existingEmailError, setExistingEmailError] = useState<string | null>(
    null,
  );
  const { setUser } = useUser();
  const { hideOverlay } = useOverlay();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({ resolver: zodResolver(formSchema) });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      setIsLoading(true);
      await registerUser(
        data.email,
        data.surname,
        data.name,
        data.gender,
        data.password,
      );
      hideOverlay();
      const loginResponse = await login(data.email, data.password);
      setTimeout(() => {
        setUser(loginResponse.user);
      }, 400);
    } catch (error) {
      error instanceof Error
        ? setExistingEmailError(error.message)
        : setExistingEmailError("O eroare neasteptata s-a intamplat");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="login-container" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex w-full flex-col items-center justify-center">
        {/* Email Field */}
        <span className="ml-10 self-start">Adresa de e-mail</span>
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

        {/* Confirm Email Field */}
        <span className="ml-10 self-start">Confirma adresa de e-mail</span>
        {errors.confirmEmail && (
          <p className="mb-1 ml-10 self-start text-sm text-red-500">
            {errors.confirmEmail.message}
          </p>
        )}
        <div className="relative flex w-10/12 flex-row items-center">
          <input
            {...register("confirmEmail")}
            type="text"
            className="login-entry"
          />
          <MailCheck className="absolute right-3" size={24} />
        </div>

        {/* Gender Field */}
        {errors.gender && (
          <p className="mb-1 ml-10 self-start text-sm text-red-500">
            {errors.gender.message}
          </p>
        )}
        <div className="ml-3 flex flex-row self-start">
          <label className="ml-8 mr-1 self-start">
            <input
              {...register("gender")}
              type="radio"
              value="F"
              className="mr-1"
            />
            Dna.
          </label>
          {"/"}
          <label className="ml-1 mr-2 self-start">
            <input
              {...register("gender")}
              type="radio"
              value="M"
              className="mr-1"
            />
            Dl.
          </label>
        </div>

        {/* Surname and Name Fields */}
        <div className="flex w-10/12 flex-row">
          <div className="ml-1 mr-2 flex w-1/2 flex-col items-center">
            {errors.surname && (
              <p className="ml-5 self-start text-sm text-red-500">
                Camp obligatoriu
              </p>
            )}
            <input
              {...register("surname")}
              type="text"
              className="no-icon-login-entry"
              placeholder="Nume..."
            />
          </div>
          <div className="ml-2 flex w-1/2 flex-col items-center">
            {errors.name && (
              <p className="ml-5 self-start text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
            <input
              {...register("name")}
              type="text"
              className="no-icon-login-entry"
              placeholder="Prenume..."
            />
          </div>
        </div>

        {/* Password Field */}
        <span className="ml-10 self-start">Parola</span>
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
          />
          <LockKeyhole className="absolute right-3" size={24} />
        </div>

        {/* Confirm Password Field */}
        <span className="ml-10 self-start">Confirma parola</span>
        {errors.confirmPassword && (
          <p className="mb-1 ml-10 self-start text-sm text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}
        <div className="relative flex w-10/12 flex-row items-center">
          <input
            {...register("confirmPassword")}
            type="password"
            className="login-entry"
          />
          <LockKeyholeOpen className="absolute right-3" size={24} />
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="flex flex-col items-center">
        <div className="mt-4 flex items-center">
          <input
            type="checkbox"
            {...register("terms")}
            className="mr-2 mt-[2px]"
          />
          <label>Accept termenii si conditiile</label>
        </div>
        {errors.terms && (
          <p className="mb-1 self-center text-sm text-red-500">
            {errors.terms.message}
          </p>
        )}
        {existingEmailError && (
          <p className="self-center text-sm text-red-500">
            {existingEmailError}
          </p>
        )}
        <button
          type="submit"
          className="m-3 w-fit rounded-2xl bg-rose-200 px-4 py-2 text-2xl"
        >
          Creeaza cont
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
