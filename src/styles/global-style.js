import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }

  html {
    color-scheme: ${({ theme }) => theme.mode};
    scroll-behavior: smooth;
    scroll-padding-top: 88px;
    -webkit-text-size-adjust: 100%;
  }

  body {
    margin: 0;
    min-width: 320px;
    background: ${({ theme }) => theme.paper};
    color: ${({ theme }) => theme.ink};
    font-family: ${({ theme }) => theme.font.body};
    font-size: 1rem;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  /* why: scaling the root (not body) makes every rem-based size — chips,
     labels, headings — grow with the 17px desktop body text. */
  @media (min-width: 900px) {
    html { font-size: 106.25%; }
  }

  img, video { display: block; max-width: 100%; }

  h1, h2, h3 {
    font-family: ${({ theme }) => theme.font.display};
    margin: 0;
    line-height: 1.05;
    letter-spacing: -0.02em;
  }

  p, ul { margin: 0; }
  ul { padding: 0; list-style: none; }

  a { color: inherit; }

  button, input, textarea { font: inherit; color: inherit; }

  :focus-visible {
    outline: 3px solid ${({ theme }) => theme.accentText};
    outline-offset: 3px;
  }

  .visually-hidden {
    position: absolute !important;
    width: 1px; height: 1px;
    padding: 0; margin: -1px;
    overflow: hidden; clip: rect(0 0 0 0);
    white-space: nowrap; border: 0;
  }

  .skip-link {
    position: absolute;
    left: 16px;
    top: -60px;
    z-index: 50;
    padding: 10px 16px;
    border-radius: 999px;
    background: ${({ theme }) => theme.ink};
    color: ${({ theme }) => theme.paper};
    font-weight: 600;
    text-decoration: none;
  }
  .skip-link:focus { top: 12px; }

  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-delay: 0ms !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

export default GlobalStyle;
