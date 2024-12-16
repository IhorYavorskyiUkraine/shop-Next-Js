import { Skeleton } from "@/components/shared/Skeleton";
import { User, UserRole } from "@prisma/client";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";

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
   const [avatar, setAvatar] = useState<string>(
      "images/userImagePlaceholder.png",
   );
   const [loading, setLoading] = useState(true);

   const handleAvatarUpload = async (
      e: React.ChangeEvent<HTMLInputElement>,
   ) => {
      if (!e.target.files || e.target.files.length === 0 || !session?.id)
         return;

      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("userId", session.id);
      formData.append("file", file);

      try {
         setLoading(true);
         const res = await fetch("/api/uploadUserAvatar", {
            method: "POST",
            body: formData,
         });

         if (!res.ok) {
            throw new Error("Failed to upload avatar");
         }

         const data = await res.json();
         setAvatar(data.url);
      } catch (error) {
         console.error(error);
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      const fetchAvatar = async () => {
         if (!session?.id) {
            setAvatar(user?.imageUrl || "images/userImagePlaceholder.png");
            setLoading(false);
            return;
         }

         try {
            const res = await fetch(`/api/getAvatar?userId=${session.id}`);
            if (res.ok) {
               const { avatarUrl } = await res.json();
               if (avatarUrl) {
                  setAvatar(avatarUrl);
               } else {
                  setAvatar(
                     session.image ||
                        user?.imageUrl ||
                        "images/userImagePlaceholder.png",
                  );
               }
            } else {
               setAvatar(
                  session.image ||
                     user?.imageUrl ||
                     "images/userImagePlaceholder.png",
               );
            }
         } catch (error) {
            console.error("Error fetching avatar:", error);
            setAvatar(
               session.image ||
                  user?.imageUrl ||
                  "images/userImagePlaceholder.png",
            );
         } finally {
            setLoading(false);
         }
      };

      fetchAvatar();
   }, [session, user]);

   return (
      <div className="mb-3 flex flex-col items-center md:mb-4">
         <div className="relative mb-1 h-28 w-28 md:mb-2">
            {loading ? (
               <Skeleton avatar />
            ) : (
               <img
                  className="size-28 rounded-full border-[1px] border-black/20"
                  src={avatar || "images/userImagePlaceholder.png"}
                  alt="User Avatar"
               />
            )}
            <label className="absolute bottom-0 right-0 flex size-[26px] cursor-pointer items-center justify-center rounded-full bg-black/50 p-1 text-white">
               <input
                  type="file"
                  className="hidden"
                  onChange={handleAvatarUpload}
                  accept="image/*"
               />
               <Pencil size={16} />
            </label>
         </div>
         <p className="text-lg font-bold leading-27 md:mb-2 md:text-xl">
            {user?.fullName}
         </p>
      </div>
   );
};
