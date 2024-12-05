import { getUserSession } from "./getUserSession";

export async function getSessionId() {
   const session = await getUserSession();
   return session ? Number(session.id) : null;
}
