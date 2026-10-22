import styled, { ThemeProvider } from "styled-components";
import { Bio } from "./data/constants";
import { lightTheme, darkTheme } from "./styles/theme";
import GlobalStyle from "./styles/global-style";
import useThemeMode from "./hooks/use-theme-mode";
import SiteHeader from "./components/site-header/site-header";
import HeroBento from "./components/hero-bento/hero-bento";
import SkillsSection from "./components/skills-section/skills-section";
import CertificationSection from "./components/certification-section/certification-section";
import ProjectsBento from "./components/projects-bento/projects-bento";
import ContactSection from "./components/contact-section/contact-section";
import { LanguageProvider, useLanguage } from "./i18n/language-context";

const SiteFooter = styled.footer`
  max-width: 1240px;
  margin: 0 auto;
  padding: 40px 20px 48px;
  color: ${({ theme }) => theme.muted};
  font-size: 0.9rem;
`;

function Page() {
  const [isDark, toggleTheme] = useThemeMode();
  const { t } = useLanguage();

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <a className="skip-link" href="#main">
        {t.skip}
      </a>
      <SiteHeader isDark={isDark} onToggleTheme={toggleTheme} />
      <main id="main">
        <HeroBento />
        <SkillsSection />
        <CertificationSection />
        <ProjectsBento />
        <ContactSection />
      </main>
      <SiteFooter>
        © {new Date().getFullYear()} {Bio.name}
      </SiteFooter>
    </ThemeProvider>
  );
}

function App() {
  return (
    <LanguageProvider>
      <Page />
    </LanguageProvider>
  );
}

export default App;
