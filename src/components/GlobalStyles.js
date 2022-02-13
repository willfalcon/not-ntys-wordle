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
    font-family: sans-serif;
    font-size: 1.6rem;
    color: ${({ theme }) => theme.dark};
    background: ${({ theme }) => theme.background};
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
  div#nprogress {
    .bar {
      background: ${({ theme }) => theme.maroon};
    }
    .spinner-icon {
      border-top-color: ${({ theme }) => theme.maroon};
      border-left-color: ${({ theme }) => theme.maroon};
    }
  }

  .underline {
    text-decoration: underline;
  }

  * {
    
  }
`;

export default GlobalStyle;
