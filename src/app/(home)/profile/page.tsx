import { getUserSession } from "@/lib/getUserSession";
import { redirect } from "next/navigation";
import { prisma } from "../../../../prisma/PrismaClient";
import { ButtonSignOut } from "../components/ButtonSignOut";

export default async function Profile() {
   const session = await getUserSession();

   if (!session) {
      return redirect("/home");
   }

   const user = await prisma.user.findFirst({
      where: { id: Number(session?.id) },
   });

   return (
      <>
         <div>{user?.fullName}</div>
         <div>{user?.email}</div>
         <div className="h-20 w-20">
            <img className="rounded-full" src={session?.image || ""} alt="" />
         </div>
         <div>
            <ButtonSignOut />
         </div>
      </>
   );
}
