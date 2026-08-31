import styled from "styled-components";
import { certifications } from "../../data/constants";

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
position: relative;
z-index: 1;
align-items: center;
padding-bottom: 40px;
`

const Wrapper = styled.div`
position: relative;
display: flex;
justify-content: space-between;
align-items: center;
flex-direction: column;
width: 100%;
max-width: 1100px;
gap: 12px;
@media (max-width: 960px) {
    flex-direction: column;
}
`

export const Title = styled.div`
font-size: 42px;
text-align: center;
font-weight: 600;
margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
margin-top: 12px;
      font-size: 32px;
  }
`;

const CertContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
  gap: 30px;
  justify-content: center;
`

const CertCard = styled.div`
  width: 100%;
  max-width: 500px;
  background: ${({ theme }) => theme.card};
  border: 0.1px solid #854CE6;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  border-radius: 16px;
  padding: 24px 36px;
  text-align: center;
  color: inherit;
  text-decoration: none;
  transition: all 0.3s ease-in-out;
  &[href]:hover {
    transform: translateY(-6px);
    filter: brightness(1.1);
  }
  @media (max-width: 768px) {
    max-width: 400px;
    padding: 18px 24px;
  }
  @media (max-width: 500px) {
    max-width: 330px;
    padding: 16px 20px;
  }
`

const CertTitle = styled.h2`
  font-size: 22px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 12px;
  line-height: 1.4;
  @media (max-width: 768px) {
    font-size: 18px;
  }
`

const CertMeta = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    font-size: 13px;
  }
`

const Certification = () => {
    return (
        <Container id="certification">
            <Wrapper>
                <Title>Certification</Title>
                <CertContainer>
                    {certifications.map((cert) => {
                        const content = (
                            <>
                                <CertTitle>{cert.title}</CertTitle>
                                <CertMeta>
                                    {cert.date} · Credential ID {cert.credentialId}
                                </CertMeta>
                            </>
                        );
                        return cert.url ? (
                            <CertCard
                                as="a"
                                key={cert.id}
                                href={cert.url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {content}
                            </CertCard>
                        ) : (
                            <CertCard key={cert.id}>{content}</CertCard>
                        );
                    })}
                </CertContainer>
            </Wrapper>
        </Container>
    )
}
export default Certification;
