import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({});

type FormFields = z.infer<typeof formSchema>;

const ShoppingForm = () => {
  const { register, handleSubmit } = useForm<FormFields>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {};

  return <form className="w-full" onSubmit={handleSubmit(onSubmit)}></form>;
};

export default ShoppingForm;
