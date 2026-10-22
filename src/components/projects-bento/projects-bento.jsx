import { useState } from "react";
import styled from "styled-components";
import { FiArrowUpRight, FiGithub, FiMaximize2 } from "react-icons/fi";
import { projects, skills } from "../../data/constants";
import { Section, SectionHead, ChipList, Chip } from "../bento-tile/tile-parts";
import GalleryDialog from "./gallery-dialog";
import { useLanguage } from "../../i18n/language-context";
import { tr } from "../../i18n/tr";

// why: which projects get a full-width row is an editorial call, not data —
// kept here by title so constants.js stays content-only.
const FEATURED = ["Uvak App", "TastyBites"];
const featured = FEATURED.map((t) => projects.find((p) => p.title.trim() === t)).filter(Boolean);
const others = projects.filter((p) => !featured.includes(p));

// why: a project can sit in several areas (TastyBites is Angular + an ASP.NET
// API), so filters match on membership, not a single category field.
const AREAS = ["All", "Frontend", "Backend", "AI"];
const inArea = (area) => (p) => area === "All" || (p.areas || []).includes(area);
const countFor = (area) => projects.filter(inArea(area)).length;

const isRealLink = (href) => Boolean(href) && href !== "#";

const FeaturedRow = styled.article`
  display: grid;
  gap: ${({ theme }) => theme.space[5]} ${({ theme }) => theme.space[6]};
  padding: ${({ theme }) => theme.space[6]} 0;
  border-top: 1px solid ${({ theme }) => theme.line};
  align-items: center;

  &:first-of-type { border-top: 0; padding-top: 0; }

  @media (min-width: 900px) {
    grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);

    /* why: alternating sides keeps two big rows from reading as a template */
    &:nth-of-type(even) > :first-child { order: 2; }
  }
`;

const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: ${({ theme }) => theme.space[6]};

  button {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    min-height: 40px;
    padding: 0 16px;
    border-radius: ${({ theme }) => theme.radius.pill};
    border: 1px solid ${({ theme }) => theme.line};
    background: ${({ theme }) => theme.surface};
    color: ${({ theme }) => theme.ink};
    font: inherit;
    font-size: 0.95rem;
    font-weight: 500;
    cursor: pointer;
  }

  button[aria-pressed="true"] {
    background: ${({ theme }) => theme.ink};
    border-color: ${({ theme }) => theme.ink};
    color: ${({ theme }) => theme.paper};
  }

  .count {
    font-size: 0.8rem;
    opacity: 0.7;
  }
`;

const AreaTags = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;

  li {
    padding: 4px 11px;
    border-radius: ${({ theme }) => theme.radius.pill};
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.02em;
  }
`;

const AreaTag = styled.li`
  background: ${({ theme, $area }) => theme.areas[$area]?.bg || theme.surface};
  color: ${({ theme, $area }) => theme.areas[$area]?.fg || theme.muted};
`;

const AreaDot = styled.span`
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: ${({ theme, $area }) => theme.areas[$area]?.dot};
`;

const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.space[1]} ${({ theme }) => theme.space[2]};
`;

const Grid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[7]} ${({ theme }) => theme.space[6]};
  padding-top: ${({ theme }) => theme.space[6]};
  border-top: 1px solid ${({ theme }) => theme.line};

  @media (min-width: 700px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const Item = styled.article`
  display: grid;
  gap: ${({ theme }) => theme.space[4]};
  align-content: start;
`;

const Frame = styled.div`
  position: relative;
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.line};
  background: ${({ theme }) => theme.surface};
  aspect-ratio: ${({ $ratio }) => $ratio};

  /* why: screenshots come in very different shapes (1.9:1 to portrait phone),
     so cropping to one ratio cut off content. Contain inside a padded stage
     shows the whole image and keeps every frame the same size in the grid. */
  padding: ${({ theme }) => theme.space[3]};

  > img,
  > video,
  > button > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
    border-radius: 8px;
  }
`;

const GalleryMain = styled.button`
  display: block;
  width: 100%;
  height: 100%;
  padding: 0;
  border: 0;
  background: none;
  cursor: zoom-in;

  .hint {
    position: absolute;
    right: 10px;
    bottom: 10px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 10px;
    border-radius: ${({ theme }) => theme.radius.pill};
    background: rgba(12, 14, 16, 0.75);
    color: #fff;
    font-size: 0.8rem;
    font-weight: 600;
  }
`;

const Thumbs = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: ${({ theme }) => theme.space[1]};
  margin-top: ${({ theme }) => theme.space[1]};

  button {
    display: block;
    width: 100%;
    padding: 0;
    border: 1px solid ${({ theme }) => theme.line};
    border-radius: 8px;
    overflow: hidden;
    background: ${({ theme }) => theme.surface};
    cursor: zoom-in;
    aspect-ratio: 4 / 3;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const Text = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[2]};
  align-content: start;

  .meta {
    color: ${({ theme }) => theme.muted};
    font-size: 0.9rem;
    font-weight: 500;
  }

  h3 {
    font-size: ${({ $big }) => ($big ? "clamp(2rem, 4vw, 3rem)" : "1.5rem")};
    font-weight: 700;
    font-variation-settings: "wdth" ${({ $big }) => ($big ? 84 : 92)};
  }

  .desc {
    color: ${({ theme }) => theme.muted};
    max-width: 58ch;
    font-size: ${({ $big }) => ($big ? "1.05rem" : "1rem")};
  }
`;

const DEVICON = "https://raw.githubusercontent.com/devicons/devicon/master/icons";
// why: project stacks reuse the Skills logos so both sections look the same;
// aliases cover version/label differences, extras cover tech not in Skills.
const skillLogos = Object.fromEntries(
  skills.flatMap((g) => g.skills).filter((s) => s.image).map((s) => [s.name, s.image])
);
const LOGO_ALIAS = {
  React: "React Js",
  "React Native": "React Js",
  "Angular 16": "Angular",
  SCSS: "Sass / SCSS",
};
const EXTRA_LOGOS = {
  "ABP / ASP.NET Core": `${DEVICON}/dotnetcore/dotnetcore-original.svg`,
  Expo: `${DEVICON}/expo/expo-original.svg`,
  "Styled Components": `${DEVICON}/styledcomponents/styledcomponents-original.svg`,
};
const logoFor = (tech) => skillLogos[LOGO_ALIAS[tech] || tech] || EXTRA_LOGOS[tech];

const Links = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]} ${({ theme }) => theme.space[4]};
  margin-top: ${({ theme }) => theme.space[1]};

  a {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-weight: 600;
    font-size: 0.95rem;
  }

  a.primary {
    padding: 10px 18px;
    border-radius: ${({ theme }) => theme.radius.pill};
    background: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.onAccent};
    text-decoration: none;
  }

  a.primary:hover { filter: brightness(1.1); }

  a.secondary {
    color: ${({ theme }) => theme.accentText};
    text-underline-offset: 4px;
  }
`;

const ProjectMedia = ({ project, ratio, onOpenGallery }) => {
  const { t } = useLanguage();
  const p = t.projects;
  const title = project.title.trim();

  if (project.type === "video") {
    return (
      <Frame $ratio={ratio}>
        <video controls playsInline preload="metadata" poster={project.poster} aria-label={p.video(title)}>
          <source src={project.image} type="video/mp4" />
        </video>
      </Frame>
    );
  }

  if (project.images?.length) {
    return (
      <div>
        <Frame $ratio={ratio}>
          <GalleryMain type="button" onClick={() => onOpenGallery(0)}>
            <img src={project.images[0]} alt={p.firstScreen(title)} />
            <span className="hint">
              <FiMaximize2 aria-hidden="true" />
              {p.screensCount(project.images.length)}
            </span>
          </GalleryMain>
        </Frame>
        <Thumbs aria-label={p.thumbs(title)}>
          {project.images.map((img, i) => (
            <li key={img}>
              <button type="button" onClick={() => onOpenGallery(i)} aria-label={p.openScreen(i + 1, project.images.length)}>
                <img src={img} alt="" loading="lazy" />
              </button>
            </li>
          ))}
        </Thumbs>
      </div>
    );
  }

  return (
    <Frame $ratio={ratio}>
      <img src={project.image} alt={p.screenshot(title)} loading="lazy" />
    </Frame>
  );
};

const ProjectText = ({ project, big }) => {
  const { lang, t } = useLanguage();
  const p = t.projects;
  const title = project.title.trim();
  const headingId = `project-${project.id}`;
  return (
    <Text $big={big}>
      <MetaRow>
        <p className="meta">{tr(project.date, lang).trim()}</p>
        {project.areas?.length > 0 && (
          <AreaTags aria-label={p.areasLabel}>
            {project.areas.map((area) => (
              <AreaTag key={area} $area={area}>
                {p.areas[area] || area}
              </AreaTag>
            ))}
          </AreaTags>
        )}
      </MetaRow>
      <h3 id={headingId}>{title}</h3>
      <p className="desc">{tr(project.description, lang).trim()}</p>
      <ChipList aria-label={p.techStack}>
        {(project.techStack || project.tags).map((tech) => {
          const logo = logoFor(tech);
          return (
            <Chip key={tech} $hasIcon={Boolean(logo)}>
              {logo && <img src={logo} alt="" loading="lazy" />}
              {tech}
            </Chip>
          );
        })}
      </ChipList>
      {(isRealLink(project.webapp) || isRealLink(project.github)) && (
        <Links>
          {isRealLink(project.webapp) && (
            <a className="primary" href={project.webapp} target="_blank" rel="noopener noreferrer">
              {p.liveSite} <FiArrowUpRight aria-hidden="true" />
              <span className="visually-hidden">{p.forTitle(title)}</span>
            </a>
          )}
          {isRealLink(project.github) && (
            <a className="secondary" href={project.github} target="_blank" rel="noopener noreferrer">
              <FiGithub aria-hidden="true" /> {p.sourceCode}
              <span className="visually-hidden">{p.forTitle(title)}</span>
            </a>
          )}
        </Links>
      )}
    </Text>
  );
};

const ProjectsBento = () => {
  const { t } = useLanguage();
  const p = t.projects;
  const [gallery, setGallery] = useState(null);
  const [area, setArea] = useState("All");
  const shownFeatured = featured.filter(inArea(area));
  const shownOthers = others.filter(inArea(area));
  const openGallery = (project) => (start) =>
    setGallery({ title: project.title.trim(), images: project.images, start });

  return (
    <Section id="projects" aria-labelledby="projects-title">
      <SectionHead>
        <h2 id="projects-title">{p.title}</h2>
        <p>{p.intro}</p>
      </SectionHead>

      {/* why: toggle buttons with aria-pressed, not tabs — the list below is
          one region that filters, not separate panels */}
      <Filters role="group" aria-label={p.filterGroup}>
        {AREAS.map((a) => (
          <button key={a} type="button" aria-pressed={area === a} onClick={() => setArea(a)}>
            {a !== "All" && <AreaDot $area={a} aria-hidden="true" />}
            {p.areas[a] || a}
            <span className="count">{countFor(a)}</span>
          </button>
        ))}
      </Filters>

      {shownFeatured.map((project) => (
        <FeaturedRow key={project.id} aria-labelledby={`project-${project.id}`}>
          <ProjectMedia project={project} ratio="16 / 10" onOpenGallery={openGallery(project)} />
          <ProjectText project={project} big />
        </FeaturedRow>
      ))}

      {shownOthers.length > 0 && (
      <Grid>
        {shownOthers.map((project) => (
          <Item key={project.id} aria-labelledby={`project-${project.id}`}>
            <ProjectMedia project={project} ratio="16 / 10" onOpenGallery={openGallery(project)} />
            <ProjectText project={project} />
          </Item>
        ))}
      </Grid>
      )}

      {gallery && (
        <GalleryDialog
          title={gallery.title}
          images={gallery.images}
          startIndex={gallery.start}
          onClose={() => setGallery(null)}
        />
      )}
    </Section>
  );
};

export default ProjectsBento;
