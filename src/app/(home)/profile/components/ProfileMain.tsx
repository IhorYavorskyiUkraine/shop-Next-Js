import { cookies } from "next/headers";
import { getUserSession } from "@/lib/getUserSession";
import { redirect } from "next/navigation";
import { getUserOrders } from "@/lib/getUserOrders";
import { getUser } from "@/lib/getUser";
import { ProfileTabs } from "./ProfileTabs";

export const ProfileMain: React.FC = async () => {
   const session = await getUserSession();
   const token = (await cookies()).get("cartToken")?.value;

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
