import { addressFormSchema, AddressFormValues } from "@/lib/constants";
import { FormProvider, useForm } from "react-hook-form";
import { InputWithValidations } from "@/components/shared/InputWithValidations";
import { createUserAddress } from "@/app/actions";
import { User } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";
import { UserAddressType } from "@/lib/getUserAddress";
import { AddressCard } from "./AddressCard";

interface Props {
   user: User | null;
   userAddress: UserAddressType | null;
}

export const ProfileAddressBookTab: React.FC<Props> = ({
   user,
   userAddress,
}) => {
   const [submitting, setSubmitting] = useState(false);
   const form = useForm<AddressFormValues>({
      resolver: zodResolver(addressFormSchema),
      defaultValues: {
         firstName: "",
         lastName: "",
         phone: "",
         city: "",
         street: "",
         house: "",
         apartment: "",
         postcode: "",
      },
   });

   if (!user || !userAddress) {
      return null;
   }

   const onSubmit = async (data: AddressFormValues) => {
      setSubmitting(true);
      try {
         if (!data) {
            return null;
         }

         await createUserAddress(data, user.id);

         toast.success("Address created", {
            icon: "✅",
         });

         form.reset();
         setSubmitting(false);
      } catch (e) {
         console.error(e);
         toast.error("Something went wrong", {
            icon: "❌",
         });
         setSubmitting(false);
      }
   };

   console.log(userAddress);

   return (
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr]">
         <div>
            {userAddress.length === 0
               ? "No addresses found"
               : userAddress?.map(address => (
                    <AddressCard
                       key={address.id}
                       fullName={address.fullName || "Unknown"}
                       phone={address.phone || "N/A"}
                       city={address.city || "Unknown"}
                       street={address.street || "Unknown"}
                       house={address.house || "Unknown"}
                       apartment={address.apartment || "Unknown"}
                       postcode={address.postcode || "Unknown"}
                    />
                 ))}
         </div>
         <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
               <div className="mb-4 grid grid-cols-2 gap-4">
                  <InputWithValidations
                     label="Recipient first name"
                     name="firstName"
                     placeholder="Enter First Name"
                  />
                  <InputWithValidations
                     label="Recipient last name"
                     name="lastName"
                     placeholder="Enter Last Name"
                  />
                  <InputWithValidations
                     label="Phone number"
                     name="phone"
                     phoneMask
                  />
                  <InputWithValidations
                     label="City"
                     name="city"
                     placeholder="Enter City"
                  />
                  <InputWithValidations
                     label="Street"
                     name="street"
                     placeholder="Enter Street"
                  />
                  <div className="grid grid-cols-3 gap-6">
                     <InputWithValidations
                        label="House"
                        name="house"
                        placeholder="№"
                        clearBtn
                     />
                     <InputWithValidations
                        label="Apartment"
                        name="apartment"
                        placeholder="№"
                        clearBtn
                     />
                     <InputWithValidations
                        label="Postcode"
                        name="postcode"
                        placeholder="№"
                        clearBtn
                     />
                  </div>
                  <Button loading={submitting} variant="black" type="submit">
                     Save
                  </Button>
               </div>
            </form>
         </FormProvider>
      </div>
   );
};
