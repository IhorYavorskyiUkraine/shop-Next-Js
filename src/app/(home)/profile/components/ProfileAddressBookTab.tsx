import { createUserAddress, updateUserAddress } from "@/app/actions";
import { InputWithValidations } from "@/components/shared/InputWithValidations";
import { Skeleton } from "@/components/shared/Skeleton";
import { Button } from "@/components/ui/button";
import { Title } from "@/components/ui/title";
import { addressFormSchema, AddressFormValues } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useProfileStore } from "../store";
import { AddressCard } from "./AddressCard";

interface Props {
   user: User | null;
}

export const ProfileAddressBookTab: React.FC<Props> = ({ user }) => {
   const [
      addressBook,
      fetchAddressBook,
      toggleAddressActivity,
      deleteAddress,
      loading,
   ] = useProfileStore(state => [
      state.addressBook,
      state.fetchAddressBook,
      state.toggleAddressActivity,
      state.deleteAddress,
      state.loading,
   ]);
   const [submitting, setSubmitting] = useState(false);
   const [editingAddressId, setEditingAddressId] = useState<number | null>(
      null,
   );
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

   const { handleSubmit, reset } = form;

   useEffect(() => {
      fetchAddressBook();
   }, []);

   if (!user || !addressBook) {
      return null;
   }

   const onSubmit = async (data: AddressFormValues) => {
      setSubmitting(true);

      try {
         if (editingAddressId) {
            await updateUserAddress(data, editingAddressId);
            toast.success("Address updated", {
               icon: "✅",
            });
         } else {
            await createUserAddress(data, user.id);
            toast.success("Address created", {
               icon: "✅",
            });
         }
         fetchAddressBook();
         setEditingAddressId(null);
      } catch (e) {
         console.error(e);
         toast.error("Something went wrong", {
            icon: "❌",
         });
      } finally {
         setSubmitting(false);
         reset({
            firstName: "",
            lastName: "",
            phone: "",
            city: "",
            street: "",
            house: "",
            apartment: "",
            postcode: "",
         });
      }
   };

   const handleUpdateAddress = async (
      data: Omit<AddressFormValues, "firstName" | "lastName" | "apartment"> & {
         fullName: string;
         apartment: string | null;
      },
      id: number,
   ) => {
      try {
         const [firstName, lastName] = data.fullName.split(" ");

         if (data) {
            reset({
               firstName: firstName || "",
               lastName: lastName || "",
               phone: data.phone || "",
               city: data.city || "",
               street: data.street || "",
               house: data.house || "",
               apartment: data.apartment || "",
               postcode: data.postcode || "",
            });
         }

         setEditingAddressId(id);
      } catch (e) {
         console.error(e);
         toast.error("Something went wrong", {
            icon: "❌",
         });
      }
   };

   const toggleActivity = async (id: number) => {
      try {
         await toggleAddressActivity(id);

         fetchAddressBook();
      } catch (e) {
         console.error(e);
         toast.error("Something went wrong", {
            icon: "❌",
         });
      }
   };

   const handleDeleteAddress = async (id: number) => {
      try {
         await deleteAddress(id);

         reset();

         fetchAddressBook();

         toast.success("Address deleted", {
            icon: "✅",
         });
      } catch (e) {
         console.error(e);
         toast.error("Something went wrong", {
            icon: "❌",
         });
      }
   };

   const addresses = addressBook?.address;

   return (
      <div
         className={cn(
            addresses?.length === 0 && "items-center",
            "grid grid-cols-1 gap-12 md:grid-cols-[300px_1fr]",
         )}
      >
         <div>
            {loading
               ? Array.from({ length: 3 }).map((_, index) => (
                    <Skeleton address key={index} />
                 ))
               : addresses?.map(address => (
                    <AddressCard
                       key={address.id}
                       fullName={address.fullName || "Unknown"}
                       phone={address.phone || "N/A"}
                       city={address.city || "Unknown"}
                       street={address.street || "Unknown"}
                       house={address.house || "Unknown"}
                       apartment={address.apartment || null}
                       postcode={address.postcode || "Unknown"}
                       toggleActivity={() => toggleActivity(address.id)}
                       updateAddress={() =>
                          handleUpdateAddress(address, address.id)
                       }
                       deleteAddress={() => handleDeleteAddress(address.id)}
                       active={address.active || false}
                    />
                 ))}
            {addresses?.length === 0 && (
               <div className="flex flex-col items-center justify-center">
                  <Title
                     text="No Address Found"
                     className="text-center !text-lg !leading-22"
                  />
                  <p className="text-[32px]">😞</p>
               </div>
            )}
         </div>
         <FormProvider {...form}>
            <form className="sticky top-0" onSubmit={handleSubmit(onSubmit)}>
               <div className="mb-4 grid grid-cols-2 gap-4">
                  <InputWithValidations
                     label="First name"
                     name="firstName"
                     placeholder="Enter First Name"
                  />
                  <InputWithValidations
                     label="Last name"
                     name="lastName"
                     placeholder="Enter Last Name"
                  />
                  <InputWithValidations
                     label="Phone number"
                     name="phone"
                     value={form.getValues("phone")}
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
               </div>
               <div className="justify-self-center md:justify-self-end">
                  <Button loading={submitting} variant="black" type="submit">
                     {editingAddressId ? "Update" : "Save"}
                  </Button>
               </div>
            </form>
         </FormProvider>
      </div>
   );
};
