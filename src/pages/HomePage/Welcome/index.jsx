import { Section } from "../../../components/Section";
import { GridContainer } from "../../../components/GridContainer";

import bgMissionImg from '../../../assets/imgs/bg-about-mission.png';
import missionImg from '../../../assets/vectors/about-mission-vector.svg';
import bgVisionImg from '../../../assets/imgs/bg-about-vision.png';
import visionImg from '../../../assets/vectors/about-vision-vector.svg';
import bgPurposeImg from '../../../assets/imgs/bg-about-purpose.png';
import purposeImg from '../../../assets/vectors/about-purpose-vector.svg';


export const Welcome = () => {
  return (
    <Section id="home">
      <div className="sub-container">
        <h1 className="xlg text-glowy-white">Explore the World of Cryptocurrencies with Crypto Tools</h1>
        <p className="mt-40 ">
          Welcome to Crypto Tools! We are your gateway to the fascinating universe of cryptocurrencies. Our platform offers you reliable information, advanced tools, and educational resources to make informed financial decisions in this thriving digital market. Whether you are a curious beginner or an experienced investor, we are here to empower you at every step of your crypto journey.
        </p>

        <p className="my-20">
          Discover the potential, transparency, and security we provide.
        </p>

        <p className="mb-50"><b>Join our community today, and let's embark on an exciting crypto future together.</b></p>
      </div>

      <div className="goals">
        <GridContainer rowClassName="justify-content-center">
          <div className="col-lg-4 col-md-6">
            <div className="goal-item">
            
              <img
                className="bg"
                src={bgMissionImg}
                alt="Mission"
              />
              <div className="text">
                <img
                  className="top-img"
                  src={missionImg}
                  alt="Unveiling the Potential of Cryptocurrencies"
                />
                <h3>Unveiling the Potential of Cryptocurrencies</h3>
                <p className="mt-20">
                  Our mission is to provide educational resources and reliable tools that allow you to venture confidently into the world of cryptocurrencies, harnessing their growing financial potential.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="goal-item">
            
              <img
                className="bg"
                src={bgVisionImg}
                alt="Vision"
              />
              <div className="text">
                <img
                  className="top-img"
                  src={visionImg}
                  alt="Empowering Your Financial Decisions"
                />
                <h3>Empowering Your Financial Decisions</h3>
                <p className="mt-20">
                  At Crypto Tools, we are committed to empowering you with relevant information and up-to-date analysis, enabling you to make informed and strategic financial decisions in the cryptocurrency market.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="goal-item">
              <img
                className="bg"
                src={bgPurposeImg}
                alt="Purpose"
              />

              <div className="text">
                <img
                  className="top-img"
                  src={purposeImg}
                  alt="Transparency and Security First"
                />
                <h3>Transparency and Security First</h3>
                <p className="mt-20">
                  We highly value transparency and security in every aspect of our platform. Our aim is to provide you with a trustworthy and secure experience while exploring, investing, and managing your digital assets.
                </p>
              </div>
            </div>
          </div>
        </GridContainer>
      </div>
    </Section>
  );
};
