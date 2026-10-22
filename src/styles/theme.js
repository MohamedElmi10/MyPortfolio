// why: one token set per mode; components read only these names so the
// dark toggle is a single ThemeProvider swap, never per-component branching.
// The palette is deliberately neutral — cobalt is the only colour on the page.
const shared = {
  // One spacing scale for the whole page: 8 / 12 / 16 / 24 / 32 / 48 / 72 / 112.
  space: { 1: "8px", 2: "12px", 3: "16px", 4: "24px", 5: "32px", 6: "48px", 7: "72px", 8: "112px" },
  radius: { xl: "28px", lg: "22px", md: "14px", pill: "999px" },
  font: {
    display: "'Bricolage Grotesque', 'Instrument Sans', system-ui, sans-serif",
    body: "'Instrument Sans', system-ui, -apple-system, 'Segoe UI', sans-serif",
  },
};

export const lightTheme = {
  ...shared,
  mode: "light",
  paper: "#F2F3F1",
  surface: "#FFFFFF",
  ink: "#16191C",
  muted: "#555C62",
  line: "rgba(22, 25, 28, 0.12)",
  accent: "#2840E0",
  onAccent: "#FFFFFF",
  // why: text/link cobalt is kept separate from the fill cobalt because in
  // dark mode the fill is too dim to pass AA as text.
  accentText: "#2238C8",
  onAccentMuted: "#E2E6FF",
  glow: "rgba(40, 64, 224, 0.08)",
  // why: per-area hues for project tags only; picked away from the cobalt
  // accent so tags never read as buttons. Text on tint passes AA.
  areas: {
    Frontend: { bg: "#DDF5EA", fg: "#0B6B45", dot: "#14A86B" },
    Backend: { bg: "#FDEBD3", fg: "#8A4B06", dot: "#E88A1A" },
    AI: { bg: "#EFE3FD", fg: "#6B2BB8", dot: "#9B5CF0" },
  },
  shadow:
    "inset 0 1px 0 rgba(255,255,255,0.8), 0 1px 2px rgba(22,25,28,0.05), 0 8px 18px -10px rgba(22,25,28,0.12), 0 24px 40px -28px rgba(22,25,28,0.18)",
  shadowHover:
    "inset 0 1px 0 rgba(255,255,255,0.8), 0 2px 4px rgba(22,25,28,0.05), 0 14px 26px -12px rgba(22,25,28,0.16), 0 34px 56px -30px rgba(22,25,28,0.24)",
};

export const darkTheme = {
  ...shared,
  mode: "dark",
  paper: "#121416",
  surface: "#1B1E21",
  ink: "#ECEEF0",
  muted: "#A3AAB1",
  line: "rgba(236, 238, 240, 0.12)",
  accent: "#2F45DB",
  onAccent: "#FFFFFF",
  accentText: "#A3B0FF",
  onAccentMuted: "#E2E6FF",
  glow: "rgba(163, 176, 255, 0.08)",
  areas: {
    Frontend: { bg: "rgba(20, 168, 107, 0.16)", fg: "#6FE0B0", dot: "#2FCB8A" },
    Backend: { bg: "rgba(232, 138, 26, 0.16)", fg: "#FFC27A", dot: "#F5A13D" },
    AI: { bg: "rgba(155, 92, 240, 0.2)", fg: "#CDB0FF", dot: "#B386FF" },
  },
  shadow:
    "inset 0 1px 0 rgba(255,255,255,0.04), 0 1px 2px rgba(0,0,0,0.4), 0 10px 22px -12px rgba(0,0,0,0.5), 0 26px 44px -28px rgba(0,0,0,0.7)",
  shadowHover:
    "inset 0 1px 0 rgba(255,255,255,0.06), 0 2px 4px rgba(0,0,0,0.4), 0 16px 30px -12px rgba(0,0,0,0.55), 0 36px 60px -30px rgba(0,0,0,0.8)",
};
