import { getUser } from "@/lib/getUser";
import { getUserOrders } from "@/lib/getUserOrders";
import { getUserSession } from "@/lib/getUserSession";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ProfileTabs } from "./ProfileTabs";

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

   return <ProfileTabs userOrders={userOrders} user={user} session={session} />;
};
