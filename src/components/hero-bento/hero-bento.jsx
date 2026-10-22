import styled from "styled-components";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { Bio } from "../../data/constants";
import BentoTile from "../bento-tile/bento-tile";
import { useLanguage } from "../../i18n/language-context";
import { tr } from "../../i18n/tr";

// why: hero holds only the intro — skills, credentials and projects each have
// their own section below, so repeating them here was noise.
const Wrap = styled.section`
  max-width: 1240px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.space[1]} 16px 0;

  @media (min-width: 640px) {
    padding: ${({ theme }) => theme.space[3]} 24px 0;
  }
`;

const NameTile = styled(BentoTile)`
  display: grid;
  gap: ${({ theme }) => theme.space[5]};

  /* why: a full-width tile with everything stacked leaves a wide empty right
     half; on desktop the name sits left and the copy right, bottom-aligned. */
  @media (min-width: 1024px) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    column-gap: ${({ theme }) => theme.space[6]};
    align-items: end;
  }
`;

const Copy = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[5]};
`;

const Name = styled.h1`
  font-size: clamp(3rem, 7vw, 6.5rem);
  font-weight: 700;
  font-variation-settings: "wdth" 100, "opsz" 96;
  line-height: 1;
  letter-spacing: -0.02em;

  span { display: block; }
`;

const Intro = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[3]};
  max-width: 60ch;
`;

const LeadRole = styled.p`
  font-family: ${({ theme }) => theme.font.display};
  font-size: clamp(1.4rem, 2.4vw, 1.85rem);
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1.2;
`;

const BioText = styled.p`
  color: ${({ theme }) => theme.onAccentMuted};
  line-height: 1.6;
`;

const Footline = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[4]};
  padding-top: ${({ theme }) => theme.space[4]};
  border-top: 1px solid rgba(255, 255, 255, 0.28);
`;

const OtherRoles = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space[1]};

  li {
    display: inline-flex;
    align-items: center;
    min-height: 34px;
    padding: 0 14px;
    border-radius: ${({ theme }) => theme.radius.pill};
    border: 1px solid rgba(255, 255, 255, 0.45);
    font-size: 0.875rem;
    font-weight: 500;
  }
`;

const Social = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space[2]} ${({ theme }) => theme.space[4]};

  a {
    display: inline-flex;
    align-items: center;
    gap: ${({ theme }) => theme.space[1]};
    min-height: 32px;
    font-weight: 600;
    text-underline-offset: 5px;
    text-decoration-color: rgba(255, 255, 255, 0.5);
  }

  a:hover { text-decoration-color: #fff; }
  a:focus-visible { outline-color: #fff; }
`;

const HeroBento = () => {
  const { lang, t } = useLanguage();
  const [leadRole, ...otherRoles] = tr(Bio.roles, lang);

  return (
  <Wrap id="top" aria-label={t.hero.label}>
    <NameTile accent size="xl" enter index={0}>
      <Name>
        {Bio.name.split(" ").map((part) => (
          <span key={part}>{part}</span>
        ))}
      </Name>
      <Copy>
        <Intro>
          <LeadRole>{leadRole}</LeadRole>
          <BioText>{tr(Bio.description, lang)}</BioText>
        </Intro>
        <Footline>
          <OtherRoles aria-label={t.hero.also}>
            {otherRoles.map((role) => (
              <li key={role}>{role}</li>
            ))}
          </OtherRoles>
          <Social aria-label={t.hero.contactLinks}>
            <li>
              <a href={Bio.github} target="_blank" rel="noopener noreferrer">
                <FaGithub aria-hidden="true" /> GitHub
              </a>
            </li>
            <li>
              <a href={Bio.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin aria-hidden="true" /> LinkedIn
              </a>
            </li>
            <li>
              <a href={`mailto:${Bio.email}`}>
                <FiMail aria-hidden="true" /> {t.hero.email}
              </a>
            </li>
          </Social>
        </Footline>
      </Copy>
    </NameTile>
  </Wrap>
  );
};

export default HeroBento;
