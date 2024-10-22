interface Props {
   fullName: string;
   phone: string;
   city: string;
   street: string;
   house: string;
   apartment: string;
   postcode: string;
}

export const AddressCard: React.FC<Props> = ({
   fullName,
   phone,
   city,
   street,
   house,
   apartment,
   postcode,
}) => {
   return (
      <article>
         <p>{fullName}</p>
         <p>{phone}</p>
         <p>{city}</p>
         <p>{street}</p>
         <p>{house}</p>
         <p>{apartment}</p>
         <p>{postcode}</p>
      </article>
   );
};
