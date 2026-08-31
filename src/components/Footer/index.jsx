import { useState } from "react";
import styled from "styled-components";
import { Bio } from "../../data/constants";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { EMAILJS_CONFIG } from "../../config/emailjs";

const FooterContainer = styled.footer`
  width: 100%;
  padding: 50px 0;
  background: ${({ theme }) => theme.card_light};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  border-top: 1px solid ${({ theme }) => theme.primary + 20};
`;

const FooterWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  padding: 0 20px;
`;

const Title = styled.h2`
  font-size: 32px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  text-align: center;
  margin: 0;
  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const Desc = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
  max-width: 600px;
  margin: 0;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const ContactLinks = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    gap: 15px;
  }
`;

const ContactLink = styled.a`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  background: transparent;
  color: ${({ theme }) => theme.primary};
  border: 1.8px solid ${({ theme }) => theme.primary};
  border-radius: 20px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.white};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${({ theme }) => theme.primary + 50};
  }
  
  @media (max-width: 768px) {
    font-size: 14px;
    padding: 10px 20px;
  }
`;

const Icon = styled.div`
  font-size: 20px;
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin-top: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const FormRow = styled.div`
  display: flex;
  gap: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
`;

const Input = styled.input`
  padding: 12px 16px;
  background: ${({ theme }) => theme.card};
  border: 1.5px solid ${({ theme }) => theme.primary + 30};
  border-radius: 12px;
  color: ${({ theme }) => theme.text_primary};
  font-size: 16px;
  outline: none;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary + 20};
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.text_secondary};
  }
  
  @media (max-width: 768px) {
    font-size: 14px;
    padding: 10px 14px;
  }
`;

const TextArea = styled.textarea`
  padding: 12px 16px;
  background: ${({ theme }) => theme.card};
  border: 1.5px solid ${({ theme }) => theme.primary + 30};
  border-radius: 12px;
  color: ${({ theme }) => theme.text_primary};
  font-size: 16px;
  outline: none;
  resize: vertical;
  min-height: 120px;
  font-family: inherit;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary + 20};
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.text_secondary};
  }
  
  @media (max-width: 768px) {
    font-size: 14px;
    padding: 10px 14px;
    min-height: 100px;
  }
`;

const SubmitButton = styled.button`
  padding: 14px 32px;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
  border: none;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: center;
  min-width: 150px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${({ theme }) => theme.primary + 50};
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
  
  @media (max-width: 768px) {
    font-size: 14px;
    padding: 12px 28px;
  }
`;

const Message = styled.div`
  padding: 12px 16px;
  border-radius: 12px;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  background: ${({ type, theme }) => 
    type === 'success' 
      ? theme.primary + 20 
      : 'rgba(255, 0, 0, 0.1)'};
  color: ${({ type, theme }) => 
    type === 'success' 
      ? theme.primary 
      : '#ff4444'};
  border: 1px solid ${({ type, theme }) => 
    type === 'success' 
      ? theme.primary + 50 
      : 'rgba(255, 0, 0, 0.3)'};
`;

const Copyright = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
  margin: 20px 0 0 0;
  padding-top: 20px;
  border-top: 1px solid ${({ theme }) => theme.primary + 20};
  width: 100%;
  max-width: 1200px;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const { SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY } = EMAILJS_CONFIG;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear message when user starts typing
    if (message.text) {
      setMessage({ type: "", text: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      setMessage({ type: "error", text: "Please fill in all fields." });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage({ type: "error", text: "Please enter a valid email address." });
      return;
    }

    setIsSubmitting(true);
    setMessage({ type: "", text: "" });

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        user_name: formData.name,
        user_email: formData.email,
        message: formData.message,
        to_name: Bio.name,
        to_email: Bio.email || "mohamed.elmiefc@gmail.com",
      };

      console.log("Sending email with params:", templateParams);

      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      );

      setMessage({
        type: "success",
        text: "Thank you! Your message has been sent successfully.",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      setMessage({
        type: "error",
        text: "Sorry, there was an error sending your message. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FooterContainer id="contact">
      <FooterWrapper>
        <Title>Get In Touch</Title>
        <Desc>
          I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.
        </Desc>
        
        <FormContainer>
          <Form onSubmit={handleSubmit}>
            <FormRow>
              <InputGroup>
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
              <InputGroup>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
            </FormRow>
            <InputGroup>
              <Label htmlFor="message">Message</Label>
              <TextArea
                id="message"
                name="message"
                placeholder="Your message here..."
                value={formData.message}
                onChange={handleChange}
                required
              />
            </InputGroup>
            {message.text && (
              <Message type={message.type}>{message.text}</Message>
            )}
            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </SubmitButton>
          </Form>
        </FormContainer>

        <ContactLinks>
          <ContactLink href={Bio.github} target="_blank" rel="noopener noreferrer">
            <Icon><FaGithub /></Icon>
            GitHub
          </ContactLink>
          <ContactLink href={Bio.linkedin} target="_blank" rel="noopener noreferrer">
            <Icon><FaLinkedin /></Icon>
            LinkedIn
          </ContactLink>
        </ContactLinks>
        {/* <Copyright>
          © {new Date().getFullYear()} {Bio.name}. All rights reserved.
        </Copyright> */}
      </FooterWrapper>
    </FooterContainer>
  );
};

export default Footer;

