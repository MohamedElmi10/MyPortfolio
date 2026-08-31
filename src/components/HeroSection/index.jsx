import styled from "styled-components";
import { Bio } from '../../data/constants'
import Typewriter from 'typewriter-effect';
import HeroImage from "../../Pictures/PB1.png"

export const HeroContainer = styled.div`
  background: ${({ theme }) => theme.card_light};
  display: flex;
  justify-content: center;
  position: relative;
  padding: 80px 30px;
  @media (max-width: 960px) {
    padding: 66px 16px;
  }
  @media (max-width: 640) {
    padding: 32px 16px;
  }
  z-index: 1;

`;

export const HeroBg = styled.div`
  position: absolute;
  display: flex;
  justify-content: end;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  max-width: 1360px;
  overflow: hidden;
  padding: 0 30px;
  top: 50%;
  left: 50%;
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);

  @media (max-width: 960px) {
    justify-content: center;
    padding: 0 0px;
  }
`;

export const HeroInnerContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1100px;

  @media (max-width: 960px) {
    flex-direction: column;
  }
`;
export const HeroLeftContainer = styled.div`
  width: 100%;
  order: 1;
  @media (max-width: 960px) {
    order: 2;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: 640px) {
    order: 2;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const HeroRightContainer = styled.div`
  width: 100%;
  display: flex;
  order: 2;
  justify-content: end;
  gap: 12px;
  @media (max-width: 960px) {
    order: 1;
    justify-content: center;
    align-items: center;
    margin-bottom: 80px;
  }

  @media (max-width: 640px) {
    margin-bottom: 30px;
  }
`;

const Img = styled.img`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 400px;
  max-height: 400px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.primary};

  @media (max-width: 768px) {
    max-width: 400px;
    max-height: 400px;
  }

  @media (max-width: 640px) {
    max-width: 280px;
    max-height: 280px;
  }
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 50px;
  color: ${({ theme }) => theme.text_primary};
  line-height: 68px;
  @media (max-width: 960px) {
    text-align: center;
  }

  @media (max-width: 640px) {
    font-size: 40px;
    line-height: 48px;
    margin-bottom: 8px;
  }
`;

const TextLoop = styled.div`
  font-weight: 600;
  font-size: 32px;
  display: flex;
  gap: 12px;
  color: ${({ theme }) => theme.text_primary};
  line-height: 68px;
  @media (max-width: 960px) {
    text-align: center;
  }
  @media (max-width: 640px) {
    font-size: 22px;
    line-height: 48px;
    margin-bottom: 16px;
  }
`;

const Span = styled.span`
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
`;

const SubTitle = styled.div`
  font-size: 20px;
  line-height: 32px;
  margin-bottom: 42px;
  color: ${({ theme }) => theme.text_primary + 95};

  @media (max-width: 960px) {
    text-align: center;
  }

  @media (max-width: 640px) {
    font-size: 16px;
    line-height: 32px;
  }
`;

const UpdateBanner = styled.div`
  background: linear-gradient(135deg, rgba(255, 193, 7, 0.1) 0%, rgba(255, 152, 0, 0.1) 100%);
  border: 2px solid rgba(255, 193, 7, 0.3);
  border-radius: 20px;
  padding: 40px 30px;
  text-align: center;
  max-width: 400px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0% {
      box-shadow: 0 8px 32px rgba(255, 193, 7, 0.2);
    }
    50% {
      box-shadow: 0 8px 32px rgba(255, 193, 7, 0.4);
    }
    100% {
      box-shadow: 0 8px 32px rgba(255, 193, 7, 0.2);
    }
  }
  
  @media (max-width: 960px) {
    max-width: 100%;
    margin: 0 20px;
  }
`;

const BannerTitle = styled.h3`
  color: ${({ theme }) => theme.primary};
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const BannerText = styled.p`
  color: ${({ theme }) => theme.text_primary};
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 20px;
  opacity: 0.9;
`;

const UpdateBadge = styled.span`
  background: linear-gradient(45deg, #ff6b35, #f7931e);
  color: white;
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: inline-block;
  border: none;
  cursor: default;
  user-select: none;
  box-shadow: 0 2px 8px rgba(255, 107, 53, 0.2);
`;

const Hero = () => {
  return (
    <div id="about">
      <HeroContainer>
        <HeroBg>
          {/* <HeroBgAnimation /> */}
        </HeroBg>
        <HeroInnerContainer >
          <HeroLeftContainer id="Left">
            <Title>Hi, I am <br /> {Bio.name}</Title>
            <TextLoop>
              I am a
              <Span>
                <Typewriter
                  options={{
                    strings: Bio.roles,
                    autoStart: true,
                    loop: true,
                  }}
                />
              </Span>
            </TextLoop>
            <SubTitle>{Bio.description}</SubTitle>
          </HeroLeftContainer>

          <HeroRightContainer id="Right">
            {/* <UpdateBanner>
              <BannerTitle>Portfolio Update</BannerTitle>
              <BannerText>
                This portfolio hasn't been updated lately. 
                A  update is incoming with new projects!
              </BannerText>
              <UpdateBadge>Update Incoming</UpdateBadge>
            </UpdateBanner> */}
          </HeroRightContainer>
        </HeroInnerContainer>

      </HeroContainer>
    </div>
  )
}
export default Hero;