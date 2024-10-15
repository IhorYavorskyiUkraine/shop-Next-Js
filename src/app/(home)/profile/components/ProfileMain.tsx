import { cookies } from "next/headers";
import { getUserSession } from "@/lib/getUserSession";
import { redirect } from "next/navigation";
import { getUserOrders } from "@/lib/getUserOrders";
import { getUser } from "@/lib/getUser";
import { ProfileTabs } from "./ProfileTabs";

export const ProfileMain: React.FC = async () => {
   const session = await getUserSession();
   const token = cookies().get("cartToken")?.value;

   if (!session || !token) {
      return redirect("/home");
   }

   const user = await getUser(Number(session.id));
   const userOrders = await getUserOrders(token, Number(session.id));

   return <ProfileTabs userOrders={userOrders} user={user} session={session} />;
};
