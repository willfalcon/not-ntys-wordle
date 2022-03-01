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

  :root {
    --dark: #000F08;
    --yellow: #FFC857;
    --green: #00916E;
    --light: #E1DEE3;
    --blue: #B4CDED;
    --maroon: #5D1725;
    --textColor: var(--dark);
    --background: white;
    --wrong: var(--maroon);
    --white: white;
    --heading: var(--dark);
  }
  body {
    &.dark-theme {
      --dark: var(--light);
      --textColor: var(--light);
      --white: #F3F5F6;
      --background: var(--dark);
      --light: #435058;
      --heading: var(--light);
    }
    &.blue-theme {
      --dark: #435058;
      --textColor: white;
      --background: #96BDC6;
      --wrong: #C84630;
      --heading: var(--light);
    }
    &.orange-theme {
      --dark: #101419;
      --textColor: #101419;
      --background: #F05D23;
      --wrong: #101419;
      --white: #FDFFFC;
      --yellow: #F0A823;
      --green: #19A889;
      --heading: #FDFFFC;
    }
    &.green-theme {
      --dark: #201E50;
      --dark: white;
      --background: #A9C5A0;
      --wrong: #525B76;
      --yellow: #FF9F1C;
      --green: #A9C5A0;
      heading: var(--light);
    }
  }
`;

export default GlobalStyle;
