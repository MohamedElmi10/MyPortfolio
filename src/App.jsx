import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import styled, { ThemeProvider } from 'styled-components';
import { darkTheme } from './utils/Themes';


const Body = styled.div`
background-color:${({ theme }) => theme.bg};
width: 100%;
height: 100%;
overflow-x: hidden;
`
  ;
function App() {


  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Body>portfolio</Body>
      </ThemeProvider>

    </>
  )
}

export default App
