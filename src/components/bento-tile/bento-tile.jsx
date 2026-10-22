import styled, { css, keyframes } from "styled-components";

// Hero-only tile. Everything below the hero is open layout, so the lift and
// spotlight live here and nowhere else.

const rise = keyframes`
  from { opacity: 0; transform: translateY(18px) scale(0.985); }
  to   { opacity: 1; transform: none; }
`;

const TileBox = styled.div`
  --mx: 50%;
  --my: 50%;
  position: relative;
  isolation: isolate;
  overflow: hidden;
  grid-area: ${({ $area }) => $area || "auto"};
  background: ${({ theme, $accent }) => ($accent ? theme.accent : theme.surface)};
  color: ${({ theme, $accent }) => ($accent ? theme.onAccent : theme.ink)};
  border-radius: ${({ theme, $size }) => ($size === "xl" ? theme.radius.xl : theme.radius.lg)};
  border: 1px solid ${({ theme, $accent }) => ($accent ? "transparent" : theme.line)};
  box-shadow: ${({ theme }) => theme.shadow};
  padding: ${({ $flush, theme }) => ($flush ? "0" : theme.space[4])};

  @media (min-width: 640px) {
    padding: ${({ $flush, theme }) => ($flush ? "0" : theme.space[5])};
  }

  @media (min-width: 1200px) {
    padding: ${({ $flush }) => ($flush ? "0" : "40px")};
  }
  transition: transform 0.35s cubic-bezier(0.2, 0.7, 0.2, 1), box-shadow 0.35s ease,
    background-color 0.3s ease;

  ${({ $enter }) =>
    $enter &&
    css`
      /* why: one orchestrated load sequence for the hero only; --i is set per
         tile so the stagger follows reading order without JS timers. */
      animation: ${rise} 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) both;
      animation-delay: calc(var(--i, 0) * 80ms + 80ms);
    `}

  /* why: spotlight sits under content (z-index -1 inside an isolated stacking
     context) so it tints the surface without washing out text or images. */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease;
    background: radial-gradient(
      320px circle at var(--mx) var(--my),
      ${({ theme, $accent }) => ($accent ? "rgba(255,255,255,0.14)" : theme.glow)},
      transparent 70%
    );
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: translateY(-3px);
      box-shadow: ${({ theme }) => theme.shadowHover};
    }
    &:hover::before { opacity: 1; }
  }

  @media (prefers-reduced-motion: reduce) {
    &:hover { transform: none; }
  }
`;

// why: pointer coords are written straight to CSS custom properties on the
// element instead of React state, so moving the mouse never re-renders.
const trackPointer = (event) => {
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
  el.style.setProperty("--my", `${event.clientY - rect.top}px`);
};

const BentoTile = ({ as, accent, area, size, flush, enter, index = 0, style, children, ...rest }) => (
  <TileBox
    as={as}
    $accent={accent}
    $area={area}
    $size={size}
    $flush={flush}
    $enter={enter}
    style={{ "--i": index, ...style }}
    onPointerMove={trackPointer}
    {...rest}
  >
    {children}
  </TileBox>
);

export default BentoTile;
