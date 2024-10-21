import { InputWithValidations } from "@/components/shared/InputWithValidations";
import { addressFormSchema } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPinHouse } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";

interface Props {}

export const ProfileAddressBookTab: React.FC<Props> = () => {
   const form = useForm({
      resolver: zodResolver(addressFormSchema),
      defaultValues: {},
   });

   return (
      <div>
         <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(data => console.log(data))}>
               <InputWithValidations
                  icon={<MapPinHouse size={20} />}
                  name="address"
                  label="Address"
               />
            </form>
         </FormProvider>
      </div>
   );
};
