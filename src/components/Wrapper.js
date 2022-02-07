import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import theme from './theme';
import GlobalStyles from './GlobalStyles';
import { SiteContextProvider } from './SiteContext';
import useWindowSize from './useWindowSize';

const Wrapper = ({ children, edition }) => {
  const size = useWindowSize();

  return (
    <ThemeProvider theme={theme}>
      <SiteContextProvider data={{ edition }}>
        <WrapperStyles windowHeight={size.height}>
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

  min-height: 100vh;
  height: ${({ windowHeight }) => windowHeight}px;
  display: grid;
  grid-template-rows: auto 1fr auto;
  align-items: center;

  position: relative;
`;

export default Wrapper;
