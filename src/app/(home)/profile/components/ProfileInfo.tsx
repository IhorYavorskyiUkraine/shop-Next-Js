import { User, UserRole } from "@prisma/client";

interface Props {
   user: User | null;
   session: {
      id: string;
      role: UserRole;
      name: string;
      image: string;
   } | null;
}

export const ProfileInfo: React.FC<Props> = ({ user, session }) => {
   return (
      <div className="mb-3 flex flex-col items-center md:mb-4">
         <div className="mb-1 h-28 w-28 md:mb-2">
            <img
               className="rounded-full"
               src={session?.image || user?.imageUrl}
               alt="User Image"
            />
         </div>
         <p className="text-lg font-bold leading-27 md:mb-2 md:text-xl">
            {user?.fullName}
         </p>
      </div>
   );
};
