import { User, UserRole } from "@prisma/client";
import { ProfileInfo } from "./ProfileInfo";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ButtonSignOut } from "../../components/ButtonSignOut";
import { InputWithValidations } from "@/components/shared/InputWithValidations";
import { Button } from "@/components/ui/button";
import { updateUserProfile } from "@/app/actions";
import { profileFormSchema, ProfileFormValues } from "@/lib/constants";
import toast from "react-hot-toast";
import { useState } from "react";
import { Mail, Lock, Phone, User as UserIcon } from "lucide-react";

interface Props {
   user: User | null;
   session: {
      id: string;
      role: UserRole;
      name: string;
      image: string;
   } | null;
}

export const ProfileContactInfoTab: React.FC<Props> = ({ user, session }) => {
   const [firstName = "", lastName = ""] = user?.fullName?.split(" ") || [];
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [value, setValue] = useState("");

   const form = useForm<ProfileFormValues>({
      resolver: zodResolver(profileFormSchema),
      defaultValues: {
         firstName: firstName,
         lastName: lastName,
         email: user?.email || "",
         phone: user?.phone || "",
         password: "",
         confirmPassword: "",
      },
   });

   const onSubmit = async (data: ProfileFormValues) => {
      setIsSubmitting(true);
      try {
         await updateUserProfile(data);

         toast.success("Profile updated", {
            icon: "✅",
         });

         setIsSubmitting(false);
      } catch (e) {
         setIsSubmitting(false);
         console.error(e);
      }
   };

   return (
      <div>
         <div className="mb-6">
            <FormProvider {...form}>
               <ProfileInfo user={user} session={session} />
               <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                     <InputWithValidations
                        icon={<UserIcon size={20} />}
                        name="firstName"
                        label="First Name"
                        placeholder="Enter First Name"
                     />
                     <InputWithValidations
                        icon={<UserIcon size={20} />}
                        name="lastName"
                        label="Last Name"
                        placeholder="Enter Last Name"
                     />
                     <InputWithValidations
                        icon={<Mail size={20} />}
                        name="email"
                        label="E-Mail"
                        placeholder="Enter E-Mail"
                     />
                     <InputWithValidations
                        icon={<Phone size={20} />}
                        name="phone"
                        phoneMask
                        label="Phone"
                     />
                     <InputWithValidations
                        icon={<Lock size={20} />}
                        name="password"
                        label="Password"
                        placeholder="Enter Password"
                     />
                     <InputWithValidations
                        icon={<Lock size={20} />}
                        name="confirmPassword"
                        label="Confirm Password"
                        placeholder="Confirm Password"
                     />
                  </div>
                  <div className="flex justify-center">
                     <Button
                        loading={isSubmitting}
                        variant="black"
                        type="submit"
                     >
                        Save
                     </Button>
                  </div>
               </form>
            </FormProvider>
         </div>
         <div className="flex justify-center">
            <ButtonSignOut />
         </div>
      </div>
   );
};
