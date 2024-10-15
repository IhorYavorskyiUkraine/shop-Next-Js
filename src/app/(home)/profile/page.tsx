import { Container } from "@/components/ui/container";
import { BreadCrumb } from "@/components/shared/BreadCrumb";
import { ProfileMain } from "./components/ProfileMain";

export default async function Profile() {
   return (
      <Container>
         <BreadCrumb name={{ name: "Profile", link: "/profile" }} />
         <ProfileMain />
      </Container>
   );
}
