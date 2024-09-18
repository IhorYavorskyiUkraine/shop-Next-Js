import { Container } from "../../ui/container";
import { TopFooter } from "./components/TopFooter";

export const Footer: React.FC = () => {
   return (
      <footer>
         <Container>
            <TopFooter />
         </Container>
      </footer>
   );
};
