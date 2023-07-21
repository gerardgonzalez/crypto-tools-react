import { GridContainer } from "../../components/GridContainer";
import { Section } from "../../components/Section";

export const MailList = () => {
  return (
    <Section id="mail-list" className="text-center text-lg-start">
      <GridContainer rowClassName="gy-5">
        <div className="col-lg-6">
          <img
            className="w-100 d-block mx-lg-0 mx-auto"
            style={{ maxWidth: 570 }}
            src="/src/assets/imgs/keep-in-touch.png"
            alt="keep-in-touch"
          />
        </div>
        <div className="col-lg-6 d-flex justify-content-lg-start justify-content-center align-items-center">
          <div className="">
            <h1 className="lg text-glowy-white">Keep in Touch</h1>
            <p className="mt-10 text-white">
              Subscribe to our newslatters and never miss on our Updates.
            </p>

            <div className="mail-list-main mt-30">
              <input type="email" placeholder="Your email here" />
              <button className="btn btn-gradient mx-auto mx-lg-0">
                <img
                  className="me-3"
                  src="/src/assets/vectors/btn-icon-mail.svg"
                  alt="mail"
                />
                <div className="btn-text fs-18">Subscribe</div>
              </button>
            </div>

            <div className="social-links mt-30 justify-content-lg-start justify-content-center">
            <a className="blue" href="#0">
              <img
                src="/src/assets/vectors/social-telegram.svg"
                alt="telegram"
              />
            </a>
            <a className="pink" href="#0">
              <img src="/src/assets/vectors/social-twitter.svg" alt="twitter" />
            </a>
            <a className="red" href="#0">
              <img src="/src/assets/vectors/social-reddit.svg" alt="reddit" />
            </a>
            <a className="blue" href="#0">
              <img src="/src/assets/vectors/social-web.svg" alt="web" />
            </a>
            <a className="pink" href="#0">
              <img src="/src/assets/vectors/social-youtube.svg" alt="youtube" />
            </a>
            </div>
          </div>
        </div>
      </GridContainer>
    </Section>
  );
};
