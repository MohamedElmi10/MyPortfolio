import styled from "styled-components";
import { FiMoon, FiSun } from "react-icons/fi";
import { Bio } from "../../data/constants";
import { useLanguage } from "../../i18n/language-context";

const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 20;
  padding: 12px 16px;

  @media (min-width: 640px) {
    padding: 14px 24px;
  }
`;

const Inner = styled.div`
  max-width: 1192px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 8px 8px 16px;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid ${({ theme }) => theme.line};
  /* why: translucent paper + blur keeps the pill legible over tiles while
     still reading as part of the same surface, not a separate chrome bar. */
  background: ${({ theme }) => (theme.mode === "light" ? "rgba(255,255,255,0.8)" : "rgba(27,30,33,0.8)")};
  backdrop-filter: saturate(1.4) blur(14px);
  -webkit-backdrop-filter: saturate(1.4) blur(14px);
  box-shadow: ${({ theme }) => theme.shadow};
`;

const Mark = styled.a`
  font-family: ${({ theme }) => theme.font.display};
  font-weight: 700;
  font-size: 1.05rem;
  letter-spacing: -0.01em;
  text-decoration: none;
  white-space: nowrap;
  border-radius: 8px;
`;

const Nav = styled.nav`
  ul {
    display: flex;
    gap: 4px;
  }

  a {
    display: block;
    padding: 8px 14px;
    border-radius: ${({ theme }) => theme.radius.pill};
    text-decoration: none;
    font-size: 0.95rem;
    font-weight: 500;
    color: ${({ theme }) => theme.muted};
    transition: background-color 0.2s ease, color 0.2s ease;
  }

  a:hover {
    color: ${({ theme }) => theme.ink};
    background: ${({ theme }) => theme.line};
  }

  /* why: at phone width only the contact link survives — four links plus the
     name and toggles cannot share a 343px pill without wrapping. Below 430px
     the language switch needs that last slot too. */
  @media (max-width: 639px) {
    li:not(:last-child) { display: none; }
  }

  @media (max-width: 429px) {
    display: none;
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Toggle = styled.button`
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.line};
  background: ${({ theme }) => theme.surface};
  cursor: pointer;
  font-size: 1.1rem;
  transition: transform 0.3s ease;

  &:hover { transform: rotate(-18deg); }
`;

const LangSwitch = styled.div`
  display: flex;
  height: 40px;
  padding: 3px;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid ${({ theme }) => theme.line};
  background: ${({ theme }) => theme.surface};

  button {
    min-width: 36px;
    padding: 0 8px;
    border: 0;
    border-radius: ${({ theme }) => theme.radius.pill};
    background: transparent;
    color: ${({ theme }) => theme.muted};
    font-size: 0.8125rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    cursor: pointer;
    transition: background-color 0.2s ease, color 0.2s ease;
  }

  button:hover { color: ${({ theme }) => theme.ink}; }

  button[aria-pressed="true"] {
    background: ${({ theme }) => theme.ink};
    color: ${({ theme }) => theme.paper};
  }
`;

const LANGS = [
  { code: "en", short: "EN", name: "English" },
  { code: "sv", short: "SV", name: "Svenska" },
];

const SiteHeader = ({ isDark, onToggleTheme }) => {
  const { lang, setLang, t } = useLanguage();
  const links = [
    { href: "#skills", label: t.header.skills },
    { href: "#certification", label: t.header.credentials },
    { href: "#projects", label: t.header.projects },
    { href: "#contact", label: t.header.contact },
  ];

  return (
    <Bar>
      <Inner>
        <Mark href="#top">{Bio.name}</Mark>
        <Right>
          <Nav aria-label={t.header.nav}>
            <ul>
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </Nav>
          {/* why: each option is labelled in its own language, so someone
              looking for "Svenska" finds it even while the page is English */}
          <LangSwitch role="group" aria-label={t.header.langGroup}>
            {LANGS.map((l) => (
              <button
                key={l.code}
                type="button"
                lang={l.code}
                aria-label={l.name}
                aria-pressed={lang === l.code}
                onClick={() => setLang(l.code)}
              >
                {l.short}
              </button>
            ))}
          </LangSwitch>
          <Toggle
            type="button"
            onClick={onToggleTheme}
            aria-pressed={isDark}
            aria-label={t.header.themeLabel}
            title={isDark ? t.header.toLight : t.header.toDark}
          >
            {isDark ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
          </Toggle>
        </Right>
      </Inner>
    </Bar>
  );
};

export default SiteHeader;
