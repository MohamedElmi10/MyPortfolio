
import { projects } from "../../data/constants"
import WeatherWaveVideo from "../../Pictures/WeatherApp.mov"
import styled from "styled-components";

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
position: relative;
z-index: 1;
align-items: center;
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

export const Desc = styled.div`
    font-size: 18px;
    text-align: center;
    max-width: 600px;
    color: ${({ theme }) => theme.text_secondary};
    @media (max-width: 768px) {
        font-size: 16px;
    }
`;
const CardContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 28px;
    flex-wrap: wrap;
    padding-bottom: 40px;

`;
const Card = styled.div`
    width: 330px;
    min-height: 490px;
    background-color: ${({ theme }) => theme.card};
    cursor: pointer;
    border-radius: 10px;
    box-shadow: 0 0 12px 4px rgba(0,0,0,0.4);
    overflow: hidden;
    padding: 26px 20px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    transition: all 0.5s ease-in-out;
    &:hover {
        transform: translateY(-10px);
        box-shadow: 0 0 50px 4px rgba(0,0,0,0.6);
        filter: brightness(1.1);
    }
    `;
const Details = styled.div`
width: 100%;
display: flex;
flex-direction: column;
gap: 0px;
padding: 0px 2px;
`;


const Date = styled.div`
    font-size: 12px;
    margin-left: 2px;
    font-weight: 400;
    color: ${({ theme }) => theme.text_secondary + 80};
    @media only screen and (max-width: 768px){
        font-size: 10px;
    }
`


const Description = styled.div`
    font-weight: 400;
    font-size: 14px;
    line-height: 1.6;
    color: ${({ theme }) => theme.text_secondary};
    overflow: hidden;
    margin-top: 8px;
    padding: 10px 12px;
    background: ${({ theme }) => theme.card + 50};
    border-radius: 8px;
    border-left: 2px solid ${({ theme }) => theme.primary};
    display: -webkit-box;
    max-width: 100%;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    @media only screen and (max-width: 768px) {
        font-size: 13px;
        padding: 8px 10px;
    }
`;

const TechStack = styled.div`
    margin-top: 12px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
`;

const TechLabel = styled.span`
    font-size: 12px;
    font-weight: 500;
    color: ${({ theme }) => theme.text_secondary};
    margin-right: 4px;
`;

const TechTag = styled.span`
    font-size: 11px;
    font-weight: 500;
    color: ${({ theme }) => theme.primary};
    background-color: ${({ theme }) => theme.primary + 15};
    padding: 4px 10px;
    border-radius: 12px;
    border: 1px solid ${({ theme }) => theme.primary + 50};
`;
const StyledImage = styled.img`
    width: 100%;
    height: 180px;
    background-color: ${({ theme }) => theme.white};
    border-radius: 10px;
    box-shadow: 0 0 16px 2px rgba(0,0,0,0.3);
`;

const StyledVideo = styled.video`
    width: 100%;
    height: 180px;
    background-color: ${({ theme }) => theme.white};
    border-radius: 10px;
    box-shadow: 0 0 16px 2px rgba(0,0,0,0.3);
    aspect-ratio: 16 / 9;       /* behåll proportioner */
    object-fit: contain;  
`;

const Projects = () => {
    return (
        <Container id="projects">
            <Wrapper>
                <Title>Projects</Title>
                <Desc>
                   The projects showcased here represent only my early work and do not reflect the full scope of my experience. <br /> Portfolio will be updated shortly.
                </Desc>
                <CardContainer>
                    {projects.map((project) => (
                        <Card 
                            key={project.id}
                            onClick={() => {
                                const url = project.webapp && project.webapp !== "#" 
                                    ? project.webapp 
                                    : project.github;
                                if (url && url !== "#") {
                                    window.open(url, "_blank");
                                }
                            }}
                        >
                            <Details>
                                <Title>{project.title}</Title>
                                <Date>{project.date}</Date>
                                <Description>{project.description}</Description>
                                {project.type === 'video' ? (
                                    <StyledVideo 
                                        src={project.image} 
                                        controls 
                                        preload="metadata"
                                        poster={project.poster}
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                ) : (
                                    <StyledImage src={project.image} />
                                )}
                                {project.techStack && project.techStack.length > 0 && (
                                    <TechStack>
                                        <TechLabel>Built with:</TechLabel>
                                        {project.techStack.map((tech, index) => (
                                            <TechTag key={index}>{tech}</TechTag>
                                        ))}
                                    </TechStack>
                                )}
                            </Details>
                        </Card>



                    ))}
                </CardContainer>
            </Wrapper>
        </Container>

    )
}

export default Projects;
