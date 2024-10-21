import { FormProvider, useForm } from "react-hook-form";
import { formRegisterSchema, TFormRegisterValues } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { InputWithValidations } from "@/components/shared/InputWithValidations";
import { Mail, Lock, UserIcon } from "lucide-react";
import { registerUser } from "@/app/actions";

interface Props {
   onClose?: VoidFunction;
   onClickLogin?: VoidFunction;
}

export const Register: React.FC<Props> = ({ onClose, onClickLogin }) => {
   const form = useForm<TFormRegisterValues>({
      resolver: zodResolver(formRegisterSchema),
      defaultValues: {
         email: "",
         fullName: "",
         password: "",
         confirmPassword: "",
      },
   });

   const onSubmit = async (data: TFormRegisterValues) => {
      try {
         await registerUser({
            email: data.email,
            fullName: data.fullName,
            password: data.password,
         });

         toast.error("Registration completed 📝. Confirm your email", {
            icon: "✅",
         });

         onClose?.();
      } catch (error) {
         return toast.error("Invalid E-Mail or password", {
            icon: "❌",
         });
      }
   };

   return (
      <FormProvider {...form}>
         <form
            className="flex flex-col gap-5"
            onSubmit={form.handleSubmit(onSubmit)}
         >
            <InputWithValidations
               icon={<Mail size={20} />}
               name="email"
               label="E-Mail"
               required
            />
            <InputWithValidations
               icon={<UserIcon size={20} />}
               name="fullName"
               label="Full name"
               required
            />
            <InputWithValidations
               icon={<Lock size={20} />}
               name="password"
               label="Password"
               type="password"
               required
            />
            <InputWithValidations
               icon={<Lock size={20} />}
               name="confirmPassword"
               label="Confirm password"
               type="password"
               required
            />
            <Button
               loading={form.formState.isSubmitting}
               className="h-12 text-base"
               type="submit"
            >
               Register
            </Button>
         </form>
      </FormProvider>
   );
};
