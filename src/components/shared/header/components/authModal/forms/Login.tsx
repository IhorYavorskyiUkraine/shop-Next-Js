import { FormProvider, useForm } from "react-hook-form";
import { formLoginSchema, TFormLoginValues } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { InputWithValidations } from "@/components/shared/InputWithValidations";
import { Mail, Lock } from "lucide-react";

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

         toast.success("You have logged in successfully", {
            icon: "✅",
         });

         onClose?.();
      } catch (error) {
         console.error("Error [LOGIN]", error);
         toast.error("Unable to login", {
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
            <InputWithValidations
               icon={<Mail size={20} />}
               name="email"
               label="E-Mail"
               required
            />
            <InputWithValidations
               icon={<Lock size={20} />}
               name="password"
               label="Password"
               type="password"
               required
               className="mb-2"
            />
            <Button loading={form.formState.isSubmitting} type="submit">
               Login
            </Button>
         </form>
      </FormProvider>
   );
};
