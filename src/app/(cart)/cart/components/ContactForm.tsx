import { TextareaWithValidations } from "@/components/shared/header/TextareaWithValidations";
import { InputWithValidations } from "@/components/shared/InputWithValidations";
import { ChevronLeftIcon, Mail, MapPinHouse, Phone, User } from "lucide-react";

interface Props {
   setContactOpen: (value: boolean) => void;
}

export const ContactForm: React.FC<Props> = ({ setContactOpen }) => {
   return (
      <div className="flex flex-1 gap-3 rounded-[20px] border-[1px] border-black/10 p-5 md:p-6">
         <ChevronLeftIcon
            onClick={() => setContactOpen(false)}
            className="cursor-pointer"
         />
         <form className="flex-1">
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
            <TextareaWithValidations name="comment" label="Comment" />
         </form>
      </div>
   );
};
