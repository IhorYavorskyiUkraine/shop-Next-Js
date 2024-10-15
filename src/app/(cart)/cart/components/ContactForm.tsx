import { TextareaWithValidations } from "@/components/shared/header/TextareaWithValidations";
import { InputWithValidations } from "@/components/shared/InputWithValidations";
import { checkoutFormSchema, CheckoutFormValues } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeftIcon, Mail, MapPinHouse, Phone, User } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { createOrder } from "@/app/actions";
import toast from "react-hot-toast";

interface Props {
   setContactOpen: (value: boolean) => void;
}

export const ContactForm: React.FC<Props> = ({ setContactOpen }) => {
   const form = useForm({
      resolver: zodResolver(checkoutFormSchema),
      defaultValues: {
         firstName: "",
         lastName: "",
         email: "",
         phone: "",
         address: "",
         comment: "",
      },
   });

   const onSubmit = async (data: CheckoutFormValues) => {
      try {
         const url = await createOrder(data);

         toast.success("Order created", {
            icon: "✅",
         });

         if (url) {
            window.location.href = url;
         }
      } catch (e) {
         console.error(e);
         toast.error("Something went wrong", {
            icon: "❌",
         });
      }
   };

   return (
      <div className="flex flex-1 gap-3 rounded-[20px] border-[1px] border-black/10 p-5 md:p-6">
         <ChevronLeftIcon
            onClick={() => setContactOpen(false)}
            className="cursor-pointer"
         />
         <FormProvider {...form}>
            <form
               onSubmit={form.handleSubmit(onSubmit)}
               className="flex-1"
               action=""
            >
               <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <InputWithValidations
                     icon={<User size={20} />}
                     name="firstName"
                     label="First Name"
                     required
                  />
                  <InputWithValidations
                     icon={<User size={20} />}
                     name="lastName"
                     label="Last Name"
                     required
                  />
                  <InputWithValidations
                     icon={<Mail size={20} />}
                     name="email"
                     label="E-Mail"
                     required
                  />
                  <InputWithValidations
                     icon={<Phone size={20} />}
                     name="phone"
                     label="Phone"
                     required
                  />
                  <InputWithValidations
                     icon={<MapPinHouse size={20} />}
                     name="address"
                     label="Address"
                     required
                  />
               </div>
               <TextareaWithValidations
                  className="mb-5"
                  name="comment"
                  label="Comment"
               />
               <Button type="submit" variant="black">
                  Save
               </Button>
            </form>
         </FormProvider>
      </div>
   );
};
