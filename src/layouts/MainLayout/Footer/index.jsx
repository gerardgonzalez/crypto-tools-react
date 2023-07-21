import { Section } from "../../../components/Section";

const currentYear = new Date().getFullYear();

export const Footer = () => {
  return (
    <Section id="footer">
      <img
        src="/src/assets/imgs/bg-mail-list.png"
        alt="gradient"
        className="gradient"
      />
      <img src="/src/assets/vectors/bg-footer.svg" alt="web" className="web" />

      <div className="links">
        <a href="#0">Changlog</a>
        <a href="#0">Terms of Service</a>
        <a href="#0">Privacy Policy</a>
        <a href="#0">Contact us</a>
      </div>

      <hr className="mt-30 mb-20" />

      <div className="copyright text-center">
        Copyright @ {currentYear} Crypto Tools. All rights reserved.
      </div>
    </Section>
  );
};