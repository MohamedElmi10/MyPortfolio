
import { Link as LinkR } from "react-router-dom"
import styled, { useTheme } from "styled-components";
import Logo from "../../Pictures/PortfolioLogo.png"
import { DiCssdeck } from "react-icons/di";
import { FaBars } from 'react-icons/fa';
import { useState } from "react";
import { Bio } from '../../data/constants';


const Nav = styled.div`
    background-color:${({ theme }) => theme.card_light};
    height:80px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    position: sticky;
    top: 0;
    z-index: 10;
    @media screen and(max-width:960px){
        transition: 0.8s all ease;
    }
`;
const NavbarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    height: 60px;
    z-index: 1;
    width: 100%;
    padding: 0 24px;
    max-width: 1200px;

`
const Navlogo = styled(LinkR)`
    width: 80%;
    padding: 0 6px;
    display: flex;
    justify-content:  flex-start;
    cursor: pointer;
    text-decoration: none;
    align-items: center;
    @media screen and (max-width: 640px){
        padding:  0 0px;
        
    }
`
const MobileIcon = styled.div`
    display: none;
    @media screen and (max-width: 768px) {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%, 50%);
        font-size: 1.5rem;
        cursor: pointer;
        color:${({ theme }) => theme.text_primary}
        
    }
`
const NavItems = styled.ul`
    width: 100%;
    display: flex;
    justify-content:  center;
    align-items: center;
    gap: 32px;
    list-style: none;
    @media screen and (max-width: 768px){
        display: none;
        
    }

`;
const NavLink = styled.a`
    color:${({ theme }) => theme.text_primary};
    font-weight: 500;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.2s ease-in-out;
    &:hover{
        color:${({ theme }) => theme.primary}
    }
`
const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: end;
    width: 80%;
    height: 100%;
    padding: 0 6px;
    @media screen and (max-width: 640px){
        display: none;
    }
`;

const GitHubButton = styled.div`
    background-color: transparent;
    color:${({ theme }) => theme.primary} ;
    border: 1.8px solid ${({ theme }) => theme.text_primary};
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 20px;
    font-size: 1rem;
    font-weight:500;
    cursor: pointer;
    height: 70%;
    :hover{
        background-color: ${({ theme }) => theme.primary};
        color:${({ theme }) => theme.white}
    }
    @media screen and (max-width: 640px) {
        font-size: 0.8rem;
    }
`
export const Span = styled.div`
    padding:  0 4px;
    font-weight: bold;
    font-size: 18px;

`

const LogoImage = styled.img`
  height: 70px;
  width: auto;
  margin-right: 10px;
  background-color: rgb(255, 255, 255);
`;
const MobileMenu = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 16px;
    position: absolute;
    top: 80;
    right: 0;
    left: 2px;
    width: 100%;
    padding: 12px 40px 24px 40px; 
    background: ${({ theme }) => theme.card_light + 99};
    transition: all 0.6s ease-in-out;
    transform: ${({ isOpen }) => (isOpen ? 'translateY(0)' : 'translateY(-100%)')};
    border-radius: 0 0 20px 20px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    opacity: ${({ isOpen }) => (isOpen ? '100%' : '0')};
    z-index: ${({ isOpen }) => (isOpen ? '1000' : '-1000')};
    
`
const MobileMenuLink = styled(LinkR)`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  :hover {
    color: ${({ theme }) => theme.primary};
  }

  &.active {
    border-bottom: 2px solid ${({ theme }) => theme.primary};
  }
`;

const MobileLink = styled.a`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  :hover {
    color: ${({ theme }) => theme.primary};
  }

  &.active {
    border-bottom: 2px solid ${({ theme }) => theme.primary};
  }
`;
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const theme = useTheme();
    return (
        <Nav>
            <NavbarContainer>
                <Navlogo to="/">
                    <LogoImage src={Logo} alt="Logo" />
                </Navlogo>
                <MobileIcon>
                    <FaBars onClick={() => {
                        setIsOpen(!isOpen)
                    }} />
                </MobileIcon>
                <NavItems>
                    <NavLink href="#about">About</NavLink>
                    <NavLink href='#skills'>Skills</NavLink>
                    <NavLink href='#experience'>Experience</NavLink>
                    <NavLink href='#projects'>Projects</NavLink>
                    <NavLink href='#education'>Education</NavLink>
                </NavItems>
                <ButtonContainer>
                    <GitHubButton href={Bio.github} target="_blank">Github Profile</GitHubButton>
                </ButtonContainer>
                {
                    isOpen &&
                    <MobileMenu isOpen={isOpen}>
                        <MobileLink href="#about" onClick={() => {
                            setIsOpen(!isOpen)
                        }}>About</MobileLink>
                        <MobileLink href='#skills' onClick={() => {
                            setIsOpen(!isOpen)
                        }}>Skills</MobileLink>
                        <MobileLink href='#experience' onClick={() => {
                            setIsOpen(!isOpen)
                        }}>Experience</MobileLink>
                        <MobileLink href='#projects' onClick={() => {
                            setIsOpen(!isOpen)
                        }}>Projects</MobileLink>
                        <MobileLink href='#education' onClick={() => {
                            setIsOpen(!isOpen)
                        }}>Education</MobileLink>
                        <GitHubButton style={{ padding: '10px 16px', background: `${theme.primary}`, color: 'white', width: 'max-content' }} href={Bio.github} target="_blank">Github Profile</GitHubButton>
                    </MobileMenu>
                }
            </NavbarContainer>
        </Nav>
    )
}

export default Navbar;