import { X } from "lucide-react";

interface Props {
   fullName: string;
   phone: string;
   city: string;
   street: string;
   house: string;
   apartment: string | null;
   postcode: string;
   active: boolean;
   toggleActivity: () => void;
   updateAddress: () => void;
   deleteAddress: () => void;
}

export const AddressCard: React.FC<Props> = ({
   fullName,
   phone,
   city,
   street,
   house,
   apartment,
   postcode,
   toggleActivity,
   updateAddress,
   deleteAddress,
   active,
}) => {
   return (
      <article className="mb-4 border-b-[1px] border-black/10 pb-4 last:mb-0 last:border-b-0 last:pb-0">
         <div className="mb-2 flex items-center justify-between">
            <p className="text-md font-bold">{fullName}</p>
            <X className="cursor-pointer" onClick={deleteAddress} size={16} />
         </div>
         <div className="mb-1 flex items-center justify-between">
            <p>Phone: {phone}</p>
            <button
               onClick={toggleActivity}
               className="flex size-4 items-center justify-center rounded-full border-[1px] border-black"
            >
               {active && <div className="size-2 rounded-full bg-black"></div>}
            </button>
         </div>
         <p className="mb-1">City: {city}</p>
         <p className="mb-1">Street: {street}</p>
         <p className="mb-1">House: {house}</p>
         {apartment && <p className="mb-1">Apartment: {apartment}</p>}
         <div className="flex items-center justify-between">
            <p>Postcode: {postcode}</p>
            <button onClick={updateAddress}>Edit</button>
         </div>
      </article>
   );
};
