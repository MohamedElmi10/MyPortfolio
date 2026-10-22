import styled from "styled-components";

// Small descriptor at the top of a hero tile — sentence case on purpose.
export const TileLabel = styled.p`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.muted};
  margin-bottom: ${({ theme }) => theme.space[4]};
`;

export const ChipList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const Chip = styled.li`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: ${({ $large }) => ($large ? "42px" : "36px")};
  padding: 0 ${({ $large }) => ($large ? "18px" : "14px")};
  padding-left: ${({ $hasIcon }) => ($hasIcon ? "10px" : undefined)};
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.line};
  font-size: ${({ $large }) => ($large ? "1rem" : "0.9375rem")};
  font-weight: 500;
  line-height: 1.2;

  img {
    width: ${({ $large }) => ($large ? "22px" : "20px")};
    height: ${({ $large }) => ($large ? "22px" : "20px")};
    object-fit: contain;
    border-radius: 4px;
  }
`;

// Open-layout section: a hairline on top, a heading, then whitespace.
export const Section = styled.section`
  max-width: 1240px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.space[7]} 16px 0;

  @media (min-width: 640px) {
    padding-left: 24px;
    padding-right: 24px;
  }

  @media (min-width: 900px) {
    padding-top: ${({ theme }) => theme.space[8]};
  }
`;

export const SectionHead = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[3]} ${({ theme }) => theme.space[6]};
  padding-top: ${({ theme }) => theme.space[4]};
  margin-bottom: ${({ theme }) => theme.space[6]};
  border-top: 1px solid ${({ theme }) => theme.line};

  @media (min-width: 900px) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    align-items: end;
  }

  h2 {
    font-size: clamp(2rem, 4.4vw, 3.2rem);
    font-weight: 700;
    font-variation-settings: "wdth" 88;
  }

  p {
    color: ${({ theme }) => theme.muted};
    max-width: 48ch;
  }
`;

export const TextLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.accentText};
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 4px;

  &:hover { text-decoration-thickness: 2px; }
`;

export const PrimaryLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 18px;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.onAccent};
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  transition: filter 0.2s ease;

  &:hover { filter: brightness(1.1); }
`;
