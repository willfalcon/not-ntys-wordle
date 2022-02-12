import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  :root {
    --dark: #000F08;
    --yellow: #FFC857;
    --green: #00916E;
    --light: #E1DEE3;
    --blue: #B4CDED;
    --maroon: #5D1725;
    --white: white;
  }
  
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
    color: ${({ theme }) => theme.dark};
    color: var(--dark);
    
    font-family: sans-serif;
    font-size: 1.6rem;
  }

  button {
    color: ${({ theme }) => theme.dark};
    color: var(--dark);
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
      border-top-color: var(--maroon);
      border-left-color: ${({ theme }) => theme.maroon};
      border-left-color: var(--maroon);
    }
  }

  .underline {
    text-decoration: underline;
  }
`;

export default GlobalStyle;
