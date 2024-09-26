import { FormProvider, useForm } from "react-hook-form";
import { formLoginSchema, TFormLoginValues } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { FormInput } from "../input";

type Props = {
   onClose: () => void;
};

export const Login: React.FC<Props> = ({ onClose }) => {
   const form = useForm<TFormLoginValues>({
      resolver: zodResolver(formLoginSchema),
      defaultValues: {
         email: "",
         password: "",
      },
   });

   const onSubmit = async (data: TFormLoginValues) => {
      try {
         const resp = await signIn("credentials", {
            ...data,
            redirect: false,
         });

         if (!resp?.ok) {
            throw Error();
         }

         toast.success("Вы успешно вошли в аккаунт", {
            icon: "✅",
         });

         onClose?.();
      } catch (error) {
         console.error("Error [LOGIN]", error);
         toast.error("Не удалось войти в аккаунт", {
            icon: "❌",
         });
      }
   };

   return (
      <FormProvider {...form}>
         <form
            className="flex flex-col gap-2"
            onSubmit={form.handleSubmit(onSubmit)}
         >
            <FormInput name="email" label="E-Mail" />
            <FormInput name="email" label="E-Mail" />

            <Button disabled={form.formState.isSubmitting} type="submit">
               Login
            </Button>
         </form>
      </FormProvider>
   );
};
