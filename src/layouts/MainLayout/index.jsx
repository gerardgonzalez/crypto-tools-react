import { Footer } from "./Footer";
import { Navbar } from "./Header/Navbar";
import { MailList } from "../../partials/MailList";

export const MainLayout = ({ navGradient, navClassName, bodyClassName, children }) => {
  return (
    <div id="main-layout">
      <Navbar navGradient={false} navClassName />
      <div id="main-body" className={bodyClassName}>
        {children}
      </div>
      <MailList />
      <Footer />
    </div>
  );
};


