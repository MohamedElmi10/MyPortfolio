import styled from "styled-components";
import { FiArrowUpRight } from "react-icons/fi";
import { certifications } from "../../data/constants";
import { Section, SectionHead, TextLink } from "../bento-tile/tile-parts";
import { useLanguage } from "../../i18n/language-context";
import { tr } from "../../i18n/tr";

const List = styled.ol`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const Item = styled.li`
  display: grid;
  gap: ${({ theme }) => theme.space[4]} ${({ theme }) => theme.space[6]};
  padding: ${({ theme }) => theme.space[5]} 0;
  border-top: 1px solid ${({ theme }) => theme.line};

  &:first-child { border-top: 0; padding-top: 0; }

  @media (min-width: 900px) {
    grid-template-columns: minmax(0, 1.7fr) minmax(0, 1fr);
  }

  h3 {
    font-size: clamp(1.35rem, 2.6vw, 1.85rem);
    font-weight: 700;
    font-variation-settings: "wdth" 90;
    line-height: 1.12;
    max-width: 30ch;
  }
`;

const LocalTitle = styled.p`
  margin-top: ${({ theme }) => theme.space[1]};
  color: ${({ theme }) => theme.muted};
  font-style: italic;
`;

const Highlights = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space[1]};
  margin-top: ${({ theme }) => theme.space[4]};

  li {
    padding: 5px 12px;
    border-radius: ${({ theme }) => theme.radius.pill};
    border: 1px solid ${({ theme }) => theme.line};
    font-size: 0.8125rem;
    font-weight: 500;
    color: ${({ theme }) => theme.muted};
  }
`;

const Details = styled.dl`
  display: grid;
  gap: ${({ theme }) => theme.space[2]};
  margin: 0;
  align-content: start;

  div {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    padding-bottom: ${({ theme }) => theme.space[2]};
    border-bottom: 1px solid ${({ theme }) => theme.line};
  }

  dt { color: ${({ theme }) => theme.muted}; }
  dd { margin: 0; font-weight: 600; text-align: right; overflow-wrap: anywhere; }
`;

const Side = styled.div`
  display: grid;
  gap: 16px;
  align-content: start;
`;

// why: the list shows a bare date under a "Date" label, so the leading verb
// from constants ("Earned …", "Certifierad …") is dropped here.
const bareDate = (date) => date.replace(/^(Earned|Completed|Certifierad|Avslutad)\s+/i, "");

const CertificationSection = () => {
  const { lang, t } = useLanguage();
  const c = t.credentials;

  return (
  <Section id="certification" aria-labelledby="cert-title">
    <SectionHead>
      <h2 id="cert-title">{c.title}</h2>
    </SectionHead>
    <List>
      {certifications.map((cert) => {
        const highlights = tr(cert.highlights, lang) || [];
        const issuer = tr(cert.issuer, lang);
        const credits = tr(cert.credits, lang);
        return (
        <Item key={cert.id}>
          <div>
            <h3>{tr(cert.title, lang)}</h3>
            {/* why: localTitle is the Swedish degree name; in Swedish the
                heading already says it, so the second line would repeat it */}
            {cert.localTitle && lang !== "sv" && <LocalTitle lang="sv">{cert.localTitle}</LocalTitle>}
            {highlights.length > 0 && (
              <Highlights aria-label={c.courseAreas}>
                {highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </Highlights>
            )}
          </div>
          <Side>
            <Details>
              {issuer && (
                <div>
                  <dt>{c.issuer}</dt>
                  <dd>{issuer}</dd>
                </div>
              )}
              <div>
                <dt>{c.date}</dt>
                <dd>{bareDate(tr(cert.date, lang))}</dd>
              </div>
              {credits && (
                <div>
                  <dt>{c.credits}</dt>
                  <dd>{credits}</dd>
                </div>
              )}
              {cert.credentialId && (
                <div>
                  <dt>{c.credentialId}</dt>
                  <dd>{cert.credentialId}</dd>
                </div>
              )}
            </Details>
            {/* why: the diploma has no url on purpose (its PDF shows a personal
                ID number), so the link only renders when one exists. */}
            {cert.url && (
              <TextLink href={cert.url} target="_blank" rel="noopener noreferrer">
                {c.verify}
                <FiArrowUpRight aria-hidden="true" />
                <span className="visually-hidden">{c.newTab}</span>
              </TextLink>
            )}
          </Side>
        </Item>
        );
      })}
    </List>
  </Section>
  );
};

export default CertificationSection;
