import { CircleUserRound } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface Props {
   onClickSignIn?: () => void;
   className?: string;
}

export const ProfileButton: React.FC<Props> = ({
   className,
   onClickSignIn,
}) => {
   const { data: session } = useSession();

   return (
      <div className={className}>
         {!session ? (
            <CircleUserRound
               onClick={onClickSignIn}
               className="cursor-pointer"
               color={"#000"}
               size={20}
            />
         ) : (
            <Link href="/profile">
               <CircleUserRound
                  className="cursor-pointer"
                  color={"#000"}
                  size={20}
               />
            </Link>
         )}
      </div>
   );
};
