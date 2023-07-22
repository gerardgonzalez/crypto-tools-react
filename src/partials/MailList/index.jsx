import { GridContainer } from "../../components/GridContainer";
import { Section } from "../../components/Section";
import keepInTouchImg from '../../assets/imgs/keep-in-touch.png';
import emailIcon from '../../assets/vectors/btn-icon-mail.svg';
import telegramIcon from '../../assets/vectors/social-telegram.svg';
import twitterIcon from '../../assets/vectors/social-twitter.svg';
import redditIcon from '../../assets/vectors/social-reddit.svg';
import webIcon from '../../assets/vectors/social-web.svg';
import youtubeIcon from '../../assets/vectors/social-youtube.svg';


export const MailList = () => {
  return (
    <Section id="mail-list" className="text-center text-lg-start">
      <GridContainer rowClassName="gy-5">
        <div className="col-lg-6">
          <img
            className="w-100 d-block mx-lg-0 mx-auto"
            style={{ maxWidth: 570 }}
            src={keepInTouchImg}
            alt="Crypto Tools Connect"
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
                  src={emailIcon}
                  alt="E-mail"
                />
                <div className="btn-text fs-18">Subscribe</div>
              </button>
            </div>

            <div className="social-links mt-30 justify-content-lg-start justify-content-center">
            <a className="blue" href="#0">
              <img
                src={telegramIcon} alt="Telegram"
              />
            </a>
            <a className="pink" href="#0">
              <img src={twitterIcon} alt="Twitter" />
            </a>
            <a className="red" href="#0">
              <img src={redditIcon} alt="Reddit" />
            </a>
            <a className="blue" href="#0">
              <img src={webIcon} alt="web" />
            </a>
            <a className="pink" href="#0">
              <img src={youtubeIcon} alt="YouTube" />
            </a>
            </div>
          </div>
        </div>
      </GridContainer>
    </Section>
  );
};
