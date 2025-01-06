import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useOverlay } from "../../contexts/OverlayContext";
import { login, register as registerUser } from "../../services/auth";
import { useRef, useState } from "react";
import { useUser } from "../../contexts/UserContext";

const formSchema = z.object({
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
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Parola trebuie sa contina cel putin o litera mare, o litera mica, un numar si un caracter special (e.g. !@#$%)",
    ),
});

type FormFields = z.infer<typeof formSchema>;

const RegisterForm = () => {
  const [existingEmailError, setExistingEmailError] = useState<string | null>(
    null,
  );
  const [confirmedEmailError, setConfirmedEmailError] = useState<string | null>(
    null,
  );
  const { setUser } = useUser();
  const { hideOverlay } = useOverlay();
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({ resolver: zodResolver(formSchema) });
  const confirmEmailRef = useRef<HTMLInputElement>(null);

  function validateEmail(secondaryEmail: string): boolean {
    return secondaryEmail === getValues("email");
  }

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    if (
      confirmEmailRef.current?.value &&
      validateEmail(confirmEmailRef.current?.value)
    ) {
      try {
        await registerUser(
          data.email,
          data.surname,
          data.name,
          data.gender,
          data.password,
        );
        hideOverlay();
        setExistingEmailError(null);
        const loginResponse = await login(data.email, data.password);
        setUser(loginResponse.user);
      } catch (error) {
        error instanceof Error
          ? setExistingEmailError(error.message)
          : setExistingEmailError("O eroare neasteptata s-a intamplat");
      }
    } else {
      setConfirmedEmailError("E-mailurile trebuie sa se potriveasca");
    }
  };

  return (
    <form className="login-container" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex w-full flex-col items-center justify-center">
        <span className="ml-10 self-start">Adresa de e-mail</span>
        {errors.email && (
          <p className="mb-1 ml-10 self-start text-sm text-red-500">
            {errors.email.message}
          </p>
        )}
        <input {...register("email")} type="text" className="login-entry" />

        <span className="ml-10 self-start">Confirma adresa de e-mail</span>
        {confirmedEmailError && (
          <p className="mb-1 ml-10 self-start text-sm text-red-500">
            {confirmedEmailError}
          </p>
        )}
        <input ref={confirmEmailRef} type="text" className="login-entry" />

        {errors.gender && (
          <p className="mb-1 ml-10 self-start text-sm text-red-500">
            {errors.gender.message}
          </p>
        )}
        <div className="flex flex-row self-start">
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

        <div className="flex w-11/12 flex-row">
          <div className="flex w-1/2 flex-col items-center">
            {/* <label className="ml-5 self-start">Nume</label> */}
            {errors.surname && (
              <p className="ml-5 self-start text-sm text-red-500">
                Camp obligatoriu
              </p>
            )}
            <input
              {...register("surname")}
              type="text"
              className="m-1 w-10/12 rounded-2xl px-4 py-[6px] text-xl ring-2 ring-gray-500 focus:outline-none focus:ring-gray-800"
              placeholder="Nume..."
            />
          </div>
          <div className="flex w-1/2 flex-col items-center">
            {/* <span className="ml-5 self-start">Prenume</span> */}
            {errors.name && (
              <p className="ml-5 self-start text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
            <input
              {...register("name")}
              type="text"
              className="login-entry"
              placeholder="Prenume..."
            />
          </div>
        </div>

        <span className="ml-10 self-start">Parola</span>
        {errors.password && (
          <p className="mb-1 ml-10 self-start text-sm text-red-500">
            {errors.password.message}
          </p>
        )}
        <input
          {...register("password")}
          type="password"
          className="login-entry"
        />
      </div>
      <div className="flex flex-col">
        {existingEmailError && (
          <p className="self-center text-sm text-red-500">
            {existingEmailError}
          </p>
        )}
        <button
          type="submit"
          className="m-3 rounded-full bg-rose-200 px-4 py-2 text-2xl"
        >
          Creeaza cont
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
