import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import theme from './theme';
import GlobalStyles from './GlobalStyles';
import { SiteContextProvider } from './SiteContext';
import { useLocalStorage, useWindowSize } from './hooks';
import Meta from './Meta';
import Header from './Header';

import Board from './Board/Board';
import Keyboard from './Keyboard/Keyboard';
const Wrapper = ({ children, word }) => {
  console.log(children);
  const size = useWindowSize();
  const [siteTheme, setTheme] = useLocalStorage('theme', 'default');

  return (
    <ThemeProvider theme={theme[siteTheme] || theme.default}>
      <SiteContextProvider data={{ setTheme, word }}>
        <WrapperStyles windowHeight={size.height}>
          <Meta />
          <Header />
          <Board />
          <Keyboard />
          {children}
          <GlobalStyles />
        </WrapperStyles>
      </SiteContextProvider>
    </ThemeProvider>
  );
};

const WrapperStyles = styled.div`
  width: 600px;
  margin-left: auto;
  margin-right: auto;
  max-width: 100%;

  height: ${({ windowHeight }) => windowHeight}px;
  display: grid;
  grid-template-rows: auto 1fr auto;
  align-items: center;

  position: relative;
`;

export default Wrapper;
