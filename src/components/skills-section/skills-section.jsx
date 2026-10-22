import styled from "styled-components";
import { skills } from "../../data/constants";
import { ChipList, Chip, Section, SectionHead } from "../bento-tile/tile-parts";
import { useLanguage } from "../../i18n/language-context";
import { tr } from "../../i18n/tr";

// why: groups are matched on their English title, which stays stable while
// the visible title switches language.
const byTitle = (title) => skills.find((g) => tr(g.title, "en") === title);
const groupKey = (group) => tr(group.title, "en");
const frontend = byTitle("Frontend");
const aiCloud = byTitle("AI & Cloud");
// why: backend and databases get logo chips (smaller rank) so the stack behind
// the UIs is visible; only the long tooling list stays as quiet text.
const secondary = ["Backend", "Databases"].map(byTitle).filter(Boolean);
const rest = skills.filter((g) => g !== frontend && g !== aiCloud && !secondary.includes(g));

const Group = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[4]};
  padding: ${({ theme }) => theme.space[5]} 0;
  border-top: 1px solid ${({ theme }) => theme.line};

  ${SectionHead} + & { border-top: 0; padding-top: 0; }

  @media (min-width: 900px) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 3fr);
    gap: ${({ theme }) => theme.space[6]};
  }

  h3 {
    font-size: ${({ $rank }) => ($rank === 1 ? "1.75rem" : $rank === 2 ? "1.4rem" : "1.15rem")};
    font-weight: ${({ $rank }) => ($rank === 3 ? 600 : 700)};
  }
`;

const RestColumns = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[4]} ${({ theme }) => theme.space[6]};
  padding-top: ${({ theme }) => theme.space[5]};
  border-top: 1px solid ${({ theme }) => theme.line};

  @media (min-width: 640px) {
    grid-template-columns: repeat(${({ $count }) => Math.max(1, $count)}, minmax(0, 1fr));
  }

  /* why: aligns the quiet groups with the chip column above on wide screens */
  @media (min-width: 900px) {
    padding-left: calc((100% - 48px) / 4 + 48px);
  }
`;

const RestGroup = styled.div`
  h3 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: ${({ theme }) => theme.space[2]};
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 6px 0;
    line-height: 1.7;
    max-width: 60ch;
    color: ${({ theme }) => theme.muted};
  }

  li:not(:last-child)::after {
    content: ",";
    margin-right: 0.4em;
  }
`;

const ChipGroup = ({ group, rank, lang }) => (
  <Group $rank={rank}>
    <h3>{tr(group.title, lang)}</h3>
    <ChipList $large={rank === 1}>
      {group.skills.map((skill) => (
        <Chip key={skill.name} $hasIcon={Boolean(skill.image)} $large={rank === 1}>
          {skill.image && <img src={skill.image} alt="" loading="lazy" />}
          {skill.name}
        </Chip>
      ))}
    </ChipList>
  </Group>
);

const SkillsSection = () => {
  const { lang, t } = useLanguage();

  return (
  <Section id="skills" aria-labelledby="skills-title">
    <SectionHead>
      <h2 id="skills-title">{t.skills.title}</h2>
      <p>{t.skills.intro}</p>
    </SectionHead>

    {frontend && <ChipGroup group={frontend} rank={1} lang={lang} />}
    {aiCloud && <ChipGroup group={aiCloud} rank={2} lang={lang} />}
    {secondary.map((group) => (
      <ChipGroup key={groupKey(group)} group={group} rank={3} lang={lang} />
    ))}

    {rest.length > 0 && (
      <RestColumns $count={rest.length}>
          {rest.map((group) => (
            <RestGroup key={groupKey(group)}>
              <h3>{tr(group.title, lang)}</h3>
              <ul>
                {group.skills.map((skill) => (
                  <li key={skill.name}>{skill.name}</li>
                ))}
              </ul>
            </RestGroup>
          ))}
      </RestColumns>
    )}
  </Section>
  );
};

export default SkillsSection;
