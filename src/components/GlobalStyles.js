import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  
  html {
    box-sizing: border-box;
    font-size: 10px;
    -ms-overflow-style: -ms-autohiding-scrollbar;
    scroll-behavior: smooth;

  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    /* font-family: ${({ theme }) => theme.font.family}; */
    /* background: ${({ theme }) => theme.blue}; */
    color: ${({ theme }) => theme.dark};
    
    font-family: sans-serif;
    font-size: 1.6rem;
  }

  button {
    color: ${({ theme }) => theme.dark};
  }

  img {
    max-width: 100%;
    height: auto;
  }

  .text-center {
    text-align: center;
    p &,
    span & {
      margin-left: auto;
      margin-right: auto;
      display: inline-block;
    }
  }
`;

export default GlobalStyle;
