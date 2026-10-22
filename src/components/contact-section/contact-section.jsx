import { useState } from "react";
import styled from "styled-components";
import emailjs from "@emailjs/browser";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { Bio } from "../../data/constants";
import { EMAILJS_CONFIG } from "../../config/emailjs";
import { Section } from "../bento-tile/tile-parts";
import { useLanguage } from "../../i18n/language-context";

const Layout = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[6]} ${({ theme }) => theme.space[7]};
  padding-top: ${({ theme }) => theme.space[4]};
  border-top: 1px solid ${({ theme }) => theme.line};

  @media (min-width: 900px) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.3fr);
  }
`;

const Intro = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[4]};
  align-content: start;

  h2 {
    font-size: clamp(2.6rem, 7vw, 4.6rem);
    font-weight: 800;
    font-variation-settings: "wdth" 80;
    line-height: 0.92;
    letter-spacing: -0.035em;
  }

  p { color: ${({ theme }) => theme.muted}; max-width: 40ch; }
`;

const Links = styled.ul`
  display: grid;
  gap: 2px;
  margin-top: 8px;

  a {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 0;
    border-bottom: 1px solid ${({ theme }) => theme.line};
    font-weight: 600;
    text-decoration: none;
    overflow-wrap: anywhere;
  }

  a:hover { color: ${({ theme }) => theme.accentText}; }

  svg { flex: none; }
`;

const Form = styled.form`
  display: grid;
  gap: ${({ theme }) => theme.space[5]};
  align-content: start;
`;

const Row = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[5]};

  @media (min-width: 560px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Field = styled.div`
  display: grid;
  gap: 4px;

  label {
    font-size: 0.9rem;
    font-weight: 600;
    color: ${({ theme }) => theme.muted};
  }

  /* why: underline-only fields keep the form part of the page rather than a
     boxed widget; the 2px bottom border still gives a clear hit target. */
  input,
  textarea {
    width: 100%;
    padding: 10px 0;
    border: 0;
    border-bottom: 2px solid ${({ theme }) => theme.line};
    border-radius: 0;
    background: transparent;
    font-size: 1.05rem;
    transition: border-color 0.2s ease;
  }

  input::placeholder,
  textarea::placeholder { color: ${({ theme }) => theme.muted}; opacity: 0.75; }

  input:focus-visible,
  textarea:focus-visible {
    outline: none;
    border-bottom-color: ${({ theme }) => theme.accentText};
  }

  textarea { min-height: 120px; resize: vertical; }
`;

const Submit = styled.button`
  justify-self: start;
  padding: 13px 26px;
  border: 0;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.onAccent};
  font-weight: 700;
  cursor: pointer;
  transition: filter 0.2s ease;

  &:hover:not(:disabled) { filter: brightness(1.1); }
  &:disabled { opacity: 0.6; cursor: progress; }
`;

const Status = styled.p`
  padding-left: 12px;
  border-left: 3px solid ${({ theme, $type }) => ($type === "success" ? theme.accentText : theme.ink)};
  font-weight: 600;
  font-size: 0.95rem;
`;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ContactSection = () => {
  const { t } = useLanguage();
  const c = t.contact;
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  // why: status stores a message key, not text, so a message already on
  // screen switches language along with the rest of the page.
  const [status, setStatus] = useState({ type: "", key: "" });
  const statusText = status.key === "errSend" ? c.errSend(Bio.email) : c[status.key];

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (status.key) setStatus({ type: "", key: "" });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus({ type: "error", key: "errEmpty" });
      return;
    }
    if (!emailPattern.test(form.email)) {
      setStatus({ type: "error", key: "errEmail" });
      return;
    }

    setSending(true);
    setStatus({ type: "", key: "" });
    try {
      // why: both from_* and user_* names are sent because the EmailJS
      // template may use either set (see src/config/emailjs.js).
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          user_name: form.name,
          user_email: form.email,
          message: form.message,
          to_name: Bio.name,
          to_email: Bio.email,
        },
        EMAILJS_CONFIG.PUBLIC_KEY
      );
      setStatus({ type: "success", key: "success" });
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus({ type: "error", key: "errSend" });
    } finally {
      setSending(false);
    }
  };

  return (
    <Section id="contact" aria-labelledby="contact-title">
      <Layout>
        <Intro>
          <h2 id="contact-title">{c.title}</h2>
          <p>{c.intro}</p>
          <Links>
            <li>
              <a href={`mailto:${Bio.email}`}>
                <FiMail aria-hidden="true" /> {Bio.email}
              </a>
            </li>
            <li>
              <a href={Bio.github} target="_blank" rel="noopener noreferrer">
                <FaGithub aria-hidden="true" /> GitHub
              </a>
            </li>
            <li>
              <a href={Bio.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin aria-hidden="true" /> LinkedIn
              </a>
            </li>
          </Links>
        </Intro>

        <Form onSubmit={onSubmit} noValidate aria-label={c.form}>
          <Row>
            <Field>
              <label htmlFor="name">{c.name}</label>
              <input id="name" name="name" type="text" autoComplete="name" value={form.name} onChange={onChange} required />
            </Field>
            <Field>
              <label htmlFor="email">{c.email}</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder={c.emailPlaceholder}
                value={form.email}
                onChange={onChange}
                required
              />
            </Field>
          </Row>
          <Field>
            <label htmlFor="message">{c.message}</label>
            <textarea id="message" name="message" value={form.message} onChange={onChange} required />
          </Field>
          <div role="status" aria-live="polite">
            {statusText && <Status $type={status.type}>{statusText}</Status>}
          </div>
          <Submit type="submit" disabled={sending}>
            {sending ? c.sending : c.send}
          </Submit>
        </Form>
      </Layout>
    </Section>
  );
};

export default ContactSection;
