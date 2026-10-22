import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import { useLanguage } from "../../i18n/language-context";

const Dialog = styled.dialog`
  width: min(1100px, calc(100vw - 32px));
  max-height: calc(100vh - 32px);
  padding: 0;
  border: 1px solid ${({ theme }) => theme.line};
  border-radius: ${({ theme }) => theme.radius.xl};
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.ink};
  box-shadow: ${({ theme }) => theme.shadowHover};
  overflow: hidden;

  &::backdrop {
    background: rgba(12, 16, 14, 0.62);
    backdrop-filter: blur(6px);
  }
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 14px 14px 22px;

  h2 { font-size: 1.25rem; font-weight: 700; }
  p { color: ${({ theme }) => theme.muted}; font-size: 0.9rem; }
`;

const RoundButton = styled.button`
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  flex: none;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.line};
  background: ${({ theme }) => theme.paper};
  font-size: 1.25rem;
  cursor: pointer;

  &:disabled { opacity: 0.35; cursor: default; }
`;

const Stage = styled.div`
  position: relative;
  padding: 0 14px 14px;

  img {
    width: 100%;
    max-height: calc(100vh - 160px);
    object-fit: contain;
    border-radius: ${({ theme }) => theme.radius.md};
    background: ${({ theme }) => theme.paper};
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const GalleryDialog = ({ title, images, startIndex, onClose }) => {
  const { t } = useLanguage();
  const g = t.gallery;
  const ref = useRef(null);
  const [index, setIndex] = useState(startIndex);
  const touchX = useRef(null);

  // why: native <dialog>.showModal() gives focus trapping, Escape-to-close and
  // inert background for free — no focus-trap library needed.
  useEffect(() => {
    const dialog = ref.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(images.length - 1, i + 1));

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  };

  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (dx < -50) next();
    if (dx > 50) prev();
    touchX.current = null;
  };

  return (
    <Dialog
      ref={ref}
      aria-labelledby="gallery-title"
      onClose={onClose}
      onKeyDown={onKeyDown}
      // why: a click whose target is the dialog element itself landed on the
      // backdrop area, so treat it as "close".
      onClick={(e) => e.target === ref.current && ref.current.close()}
    >
      <Top>
        <div>
          <h2 id="gallery-title">{title}</h2>
          <p aria-live="polite">
            {g.counter(index + 1, images.length)}
          </p>
        </div>
        <Controls>
          <RoundButton type="button" onClick={prev} disabled={index === 0} aria-label={g.prev}>
            <FiChevronLeft aria-hidden="true" />
          </RoundButton>
          <RoundButton
            type="button"
            onClick={next}
            disabled={index === images.length - 1}
            aria-label={g.next}
          >
            <FiChevronRight aria-hidden="true" />
          </RoundButton>
          <RoundButton type="button" onClick={() => ref.current.close()} aria-label={g.close}>
            <FiX aria-hidden="true" />
          </RoundButton>
        </Controls>
      </Top>
      <Stage
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={onTouchEnd}
      >
        <img src={images[index]} alt={g.imageAlt(title, index + 1, images.length)} />
      </Stage>
    </Dialog>
  );
};

export default GalleryDialog;
