
import { useState } from "react";
import { projects } from "../../data/constants"
import WeatherWaveVideo from "../../Pictures/WeatherApp.mov"
import styled from "styled-components";
import { CloseCircleOutlined, ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";

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
    object-fit: cover;
`;

const ImageGallery = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    width: 100%;
`;

const GalleryImage = styled.img`
    width: 100%;
    height: 85px;
    background-color: ${({ theme }) => theme.white};
    border-radius: 8px;
    box-shadow: 0 0 12px 2px rgba(0,0,0,0.3);
    object-fit: cover;
    cursor: pointer;
    transition: transform 0.2s ease;
    
    &:hover {
        transform: scale(1.05);
    }
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

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.9);
    display: ${props => props.isOpen ? 'flex' : 'none'};
    justify-content: center;
    align-items: center;
    z-index: 1000;
    padding: 20px;
`;

const ModalContent = styled.div`
    position: relative;
    max-width: 90%;
    max-height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ModalImage = styled.img`
    max-width: 100%;
    max-height: 90vh;
    object-fit: contain;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
`;

const CloseButton = styled.button`
    position: absolute;
    top: 30px;
    right: 30px;
    background: transparent;
    border: none;
    color: black;
    font-size: 28px;
    width: auto;
    height: auto;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    z-index: 1001;
    padding: 0;
    
    .anticon {
        font-size: 28px;
        color: black;
    }
    
    &:hover {
        transform: scale(1.1);
        opacity: 0.7;
    }
    
    @media (max-width: 768px) {
        top: 15px;
        right: 15px;
        
        .anticon {
            font-size: 22px;
        }
    }
    
    @media (max-width: 480px) {
        top: 10px;
        right: 10px;
        
        .anticon {
            font-size: 18px;
        }
    }
`;

const NavButton = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255, 255, 255, 0.3);
    color: white;
    font-size: 24px;
    width: 50px;
    height: 50px;
    min-width: 50px;
    min-height: 50px;
    border-radius: 50%;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    z-index: 1001;
    opacity: ${props => props.disabled ? '0.3' : '1'};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    padding: 0;
    overflow: hidden;
    
    .anticon {
        font-size: 24px;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    &:hover:not(:disabled) {
        background: rgba(0, 0, 0, 0.8);
        border-color: rgba(255, 255, 255, 0.5);
        transform: translateY(-50%) scale(1.1);
    }
    
    ${props => props.direction === 'left' ? 'left: 20px;' : 'right: 20px;'}
    
    @media (max-width: 768px) {
        width: 45px;
        height: 45px;
        min-width: 45px;
        min-height: 45px;
        ${props => props.direction === 'left' ? 'left: 15px;' : 'right: 15px;'}
        
        .anticon {
            font-size: 20px;
        }
    }
    
    @media (max-width: 480px) {
        width: 36px;
        height: 36px;
        min-width: 36px;
        min-height: 36px;
        ${props => props.direction === 'left' ? 'left: 10px;' : 'right: 10px;'}
        
        .anticon {
            font-size: 16px;
        }
    }
`;

const ImageCounter = styled.div`
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 14px;
    z-index: 1001;
    white-space: nowrap;
    
    @media (max-width: 768px) {
        bottom: 15px;
        padding: 6px 14px;
        font-size: 13px;
    }
    
    @media (max-width: 480px) {
        bottom: 10px;
        padding: 4px 10px;
        font-size: 11px;
    }
`;

const Projects = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    const openModal = (images, index) => {
        setSelectedImage(images);
        setCurrentImageIndex(index);
    };

    const closeModal = () => {
        setSelectedImage(null);
        setCurrentImageIndex(0);
    };

    const nextImage = () => {
        if (selectedImage && currentImageIndex < selectedImage.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        }
    };

    const prevImage = () => {
        if (selectedImage && currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
        }
    };

    // Handle keyboard navigation
    const handleKeyDown = (e) => {
        if (!selectedImage) return;
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    };

    // Touch/swipe handlers
    const minSwipeDistance = 50;

    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            nextImage();
        }
        if (isRightSwipe) {
            prevImage();
        }
    };

    return (
        <Container id="projects" onKeyDown={handleKeyDown} tabIndex={0}>
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
                                ) : project.images && project.images.length > 0 ? (
                                    <ImageGallery>
                                        {project.images.map((img, imgIndex) => (
                                            <GalleryImage 
                                                key={imgIndex} 
                                                src={img} 
                                                alt={`${project.title} ${imgIndex + 1}`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    openModal(project.images, imgIndex);
                                                }}
                                            />
                                        ))}
                                    </ImageGallery>
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
            
            <ModalOverlay isOpen={selectedImage !== null} onClick={closeModal}>
                <ModalContent 
                    onClick={(e) => e.stopPropagation()}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                >
                    {selectedImage && (
                        <>
                            <CloseButton onClick={closeModal} aria-label="Close modal">
                                <CloseCircleOutlined />
                            </CloseButton>
                            {selectedImage.length > 1 && (
                                <>
                                    <NavButton 
                                        direction="left" 
                                        onClick={prevImage} 
                                        disabled={currentImageIndex === 0}
                                        aria-label="Previous image"
                                    >
                                        <ArrowLeftOutlined />
                                    </NavButton>
                                    <NavButton 
                                        direction="right" 
                                        onClick={nextImage} 
                                        disabled={currentImageIndex === selectedImage.length - 1}
                                        aria-label="Next image"
                                    >
                                        <ArrowRightOutlined />
                                    </NavButton>
                                    <ImageCounter>
                                        {currentImageIndex + 1} / {selectedImage.length}
                                    </ImageCounter>
                                </>
                            )}
                            <ModalImage 
                                src={selectedImage[currentImageIndex]} 
                                alt={`Image ${currentImageIndex + 1}`}
                                draggable={false}
                            />
                        </>
                    )}
                </ModalContent>
            </ModalOverlay>
        </Container>

    )
}

export default Projects;
