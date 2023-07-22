import clsx from 'clsx';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';
import { GridContainer } from '../../components/GridContainer';
import { Section } from '../../components/Section';
import { MainLayout } from '../../layouts/MainLayout';
import holderCalculatorImg from '../../assets/imgs/holder-calculator.png';

const toolsList = [
  {
    name: "Holder Calculator",
    img: holderCalculatorImg,
    description1: "Did you purchase tokens from a pre-sale and are you planning on staking them?",
    description2: "<p>This calculator <b>will help you calculate your profits</b> and <b>optimize your returns through compound interest</b>.</p>",
    pink: true,
    blue: false
  }
];

export const CryptoTools = () => {

  
  return (
    <MainLayout bodyClassName="pt-sm" navGradient={true}>
      <Section id="crypto-tools" className="tool-item">
      <div className="sub-container">
        <h2 className="mb-40 text-glowy-white">Crypto Tools</h2>

        <GridContainer>
        {toolsList.map((el, idx) => {
          const { name, img, description1, description2, pink, blue } = el;

          return (
            <div className="col-xl-6" key={"completed-item-" + idx}>
              <Link
                to="/crypto-tools/holder-calculator"
                className={clsx({ pink, blue }, "completed-item-wrap")}
              >
                <div className="completed-item-main">
                  <div className="item-head">
                    <div className="head-text gap-30">
                      <div className="text-left">
                        <h3 className="mb-10">{name}</h3>
                        <div className="fs-20 text-light-1 mt-3 mb-3">{description1}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <img className="tool-img" src={img} alt={name} />
                  </div>

                  <div className="item-body text-left mt-30">
                    <div>
                      <div className="fs-20 text-light-1">{parse(description2)}</div>
                    </div>
                  </div>

                
                </div>
              </Link>
            </div>
          );
        })}
        </GridContainer>
        </div>
      </Section>
    </MainLayout>
  );
};
