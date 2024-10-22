import { cookies } from "next/headers";
import { getUserSession } from "@/lib/getUserSession";
import { redirect } from "next/navigation";
import { getUserOrders } from "@/lib/getUserOrders";
import { getUser } from "@/lib/getUser";
import { ProfileTabs } from "./ProfileTabs";
import { getUserAddress } from "@/lib/getUserAddress";

export const ProfileMain: React.FC = async () => {
   const session = await getUserSession();
   const token = cookies().get("cartToken")?.value;

   if (!session || !token) {
      return redirect("/home");
   }

   const user = await getUser(Number(session.id));
   const userOrders = await getUserOrders(
      Number(session.id),
      user?.email,
      token,
   );
   const userAddress = await getUserAddress(Number(session.id));

   return (
      <ProfileTabs
         userAddress={userAddress}
         userOrders={userOrders}
         user={user}
         session={session}
      />
   );
};
